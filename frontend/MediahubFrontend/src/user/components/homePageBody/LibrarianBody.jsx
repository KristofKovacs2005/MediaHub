import { useEffect, useState } from "react";
import { Header } from "../header/header";
import { getOrdersForLibrarian } from "../../functions/orders.js";
import { PieChart } from "../charts/pieChart/pieChart.jsx";
import HeaderText from "../header/headerTextUser.jsx";
import "./librarianBody.css";

export default function LibrarianBody() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdersForLibrarian();
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  const statusCounts = { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0 };
  const labels = ["Várakozik", "Elfogadva", "Elutasítva", "Visszahozva", "Visszahozva késő", "Késik"];

  orders.forEach(order => {
    if(statusCounts[order.s_id] !== undefined) statusCounts[order.s_id]++;
  });

  const values = Object.values(statusCounts);

  return (
    <div className="guest-body">
      <Header title={<HeaderText/>} />
      
      {/* div divider */}
      <div className="div-divider"></div>

      {/* Pie chart section */}
      <section className="section-container">
        <div className="pie-chart-card">
          <h3>Rendelések státusz szerint</h3>
          <PieChart 
            valuesArray={values} 
            labelsArray={labels} 
            onSliceClick={(label) => console.log(label)} 
          />
        </div>
      </section>

      {/* Statistics section */}
      <section className="section-container">
        <div className="stats-card">
          <h3>Statisztikák</h3>
          {/* ide majd a stat card komponens jön */}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="appFooter">
        <div className="footerInner">
          {/* footer content */}
        </div>
      </footer>
    </div>
  );
}