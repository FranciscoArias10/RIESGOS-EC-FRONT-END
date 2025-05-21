import React, { useEffect, useRef } from "react";

function incidentschart({ incidents }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Cargar Chart.js si no está disponible
    if (!window.Chart) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/chart.js";
      script.onload = createChart;
      document.head.appendChild(script);
    } else {
      createChart();
    }

    return () => {
      // Destruir el gráfico cuando el componente se desmonte
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [incidents]);

  const createChart = () => {
    const ctx = chartRef.current.getContext("2d");

    // Destruir el gráfico anterior si existe
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Crear nuevo gráfico
    chartInstance.current = new window.Chart(ctx, {
      type: "line",
      data: {
        labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
        datasets: [
          {
            label: "Incidentes",
            data: incidents,
            backgroundColor: "rgba(233, 69, 96, 0.2)",
            borderColor: "rgba(233, 69, 96, 1)",
            borderWidth: 2,
            tension: 0.3,
            pointBackgroundColor: "rgba(233, 69, 96, 1)",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
          x: {
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
          tooltip: {
            backgroundColor: "rgba(16, 21, 38, 0.9)",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "#e94560",
            borderWidth: 1,
          },
        },
      },
    });
  };

  return <canvas ref={chartRef} />;
}

export default incidentschart;
