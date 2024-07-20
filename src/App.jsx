import { useEffect, useState } from "react";
import axios from "axios";


// Components
import {
  BarChartComponent,
  Filter,
  Loader,
  CustomersTable,
} from "./components";

const ENDPOINTS = ["/customers", "/transactions"];
export default function App() {
  const [filter, setFilter] = useState(""); // Filter data based on name or amount
  const [customer, setCustomer] = useState(); // customer's name and transaction history in bar chart
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [transactions, setTransactions] = useState([]); // Customer's transaction table
  const [customers, setCustomers] = useState(); // Customers list
  const [open, setOpen] = useState(false); // Modal state

  async function getCustomers(endpoints) {
    try {
      const res = await Promise.all(
        endpoints.map((endpoint) =>
          axios.get(`https://server-nu-black.vercel.app${endpoint}`)
        )
      );

      const [_customers, transactions] = res.map((data) => data.data);

      setCustomers(
        new Map(
          _customers.map((customer) => [
            customer.id,
            customer.name,
          ])
        )
      );

      setTransactions(transactions);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  function getTransactionHistory(customerId) {
    setOpen(true);

    if (customerId === customer?.id) return;

    let customerName = customers?.get(customerId);

    let customerTransactions = transactions.filter(
      (trans) => trans.customer_id === customerId
    );

    setCustomer({
      id: customerId,
      name: customerName,
      transactions: customerTransactions,
    });
  }

  useEffect(() => {
    if (!transactions?.length) {
      getCustomers(ENDPOINTS);
    }
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      <h1 className="mainH1 justify-content-center d-flex mt-5">

        Customers Transactions
      </h1>
      <div className="container-fluid">      <Filter filter={filter} setFilter={setFilter} />
      <CustomersTable
        customers={customers}
        getTransactionHistory={getTransactionHistory}
        transactions={transactions}
        filter={filter}
      />
      <BarChartComponent
        customerName={customer?.name}
        transactions={customer?.transactions}
        open={open}
        setOpen={setOpen}
      /></div>

    </>
  );
}
