import React, { useState } from "react";
import { Graphviz } from "graphviz-react";
import swall from "sweetalert2";

function Matriz() {
  const [inputFilas, setInputFilas] = useState(0);
  const [inputColumnas, setInputColumnas] = useState(0);
  const [filas, setFilas] = useState(0);
  const [columnas, setColumnas] = useState(0);
  const [matriz, setMatriz] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que se recargue la página
    const f = parseInt(inputFilas) || 0;
    const c = parseInt(inputColumnas) || 0;

    setFilas(f);
    setColumnas(c);
    setMatriz(
      Array(f)
        .fill()
        .map(() => Array(c).fill(0))
    );
  };

  const handleInputChange = (fila, col, value) => {
    const nuevaMatriz = matriz.map((f, i) =>
      f.map((c, j) => (i === fila && j === col ? parseInt(value) || 0 : c))
    );
    setMatriz(nuevaMatriz);
  };

  const ComoUsar = () => {
    swall.fire({
      title: "Como usar Grafos Matematicos",
      html: "<h5>1. Ingrese la cantidad de filas y columnas de la matriz de adyacencia.</h5><h5>2. Conecte los nodos ingresando 1 o 0 en las casillas correspondientes y observaras como tu nodo se organiza.</h5>",
      icon: "info",
      confirmButtonText: "Aceptar",
    });
  };

  const generarDOT = () => {
    let dot = "graph G {\n";

    for (let i = 0; i < filas; i++) {
      for (let j = i; j < columnas; j++) {
        // Solo desde j=i para no repetir aristas
        if (matriz[i][j] === 1) {
          dot += `  ${i + 1} -- ${j + 1};\n`;
        }
      }
    }

    dot += "}";
    return dot;
  };

  return (
    <>
      <section id="container_Infomatriz">
        <h2>Ingresar informacion de una matriz de adyacencia:</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            min="0"
            placeholder="Cantidad de filas"
            className="input"
            value={inputFilas}
            onChange={(e) => setInputFilas(e.target.value)}
          />
          <input
            type="number"
            min="0"
            placeholder="Cantidad de columnas"
            className="input"
            value={inputColumnas}
            onChange={(e) => setInputColumnas(e.target.value)}
          />
          <button type="submit">Generar matriz</button>
        </form>
      </section>

      {filas > 0 && columnas > 0 && (
        <section id="container_matriz">
          <h3>Conecta tu matriz de adyacencia</h3>

          <table id="Matriz">
            <thead>
              <tr>
                <th></th>
                {Array.from({ length: columnas }).map((_, j) => (
                  <th key={`col-head-${j}`}>{j + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matriz.map((fila, i) => (
                <tr key={`fila-${i}`}>
                  <th>{i + 1}</th>
                  {fila.map((valor, j) => (
                    <td key={`${i}-${j}`}>
                      <input
                        type="number"
                        min="0"
                        max="1"
                        value={valor}
                        onChange={(e) =>
                          handleInputChange(i, j, e.target.value)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <section>
            {matriz.length > 0 && (
              <section style={{ marginTop: "40px" }}>
                <Graphviz
                  dot={generarDOT()}
                  options={{ width: 500, height: 500 }}
                />
              </section>
            )}
          </section>
        </section>
      )}

      <footer>
        <button onClick={ComoUsar}>Como usar Grafos Matematicos</button>
        <div>
          <h4>Cristian Alvarez || 2451034-2724</h4>
          <h4>Victor Tigreros || 2357768-2724</h4>
          <h6>APP GRAFOS MATEMATICOS || 2025</h6>
          <h6>
            Aplicación desarrollada con fines educativos para la Universidad del
            Valle, ubicada en el Valle del Cauca, Colombia.
          </h6>
        </div>
      </footer>
    </>
  );
}

export default Matriz;
