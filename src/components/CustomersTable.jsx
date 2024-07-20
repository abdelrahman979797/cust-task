

// Functions
import { formatCurrency } from "../utils/FormatCurrency";
import Table from 'react-bootstrap/Table';


export default function CustomersTable({
  transactions,
  filter,
  customers,
  getTransactionHistory,
}) {
  function handleSort(a, b) {
    let aDate = new Date(a.date);
    let bDate = new Date(b.date);

    return +aDate - +bDate;
  }
  
  return (
    <div className="container-fluid"

    >
      <Table striped bordered hover className="table-striped table table-success start">
        <thead
>
          <tr>
            <th>
              #
            </th>
            <th

            >
              Customer Name
            </th>
            <th

            >
              Transaction Amount
            </th>
            <th
            >
              Transaction Date
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions
            .sort(handleSort)
            .filter((trans) => {
              if (!filter) return trans;

              if (isNaN(+filter)) {
                return customers
                  .get(trans.customer_id)
                  ?.toLowerCase()
                  .includes(filter);
              }

              return trans.amount.toString().includes(filter);
            })
            .map((transaction) => (
              <tr
                key={transaction.id}
               
                onClick={() => getTransactionHistory(transaction.customer_id)}
                
              >
                <td

                >
                  {transaction.id}
                </td>
                <th

                >
                  {customers.get(transaction.customer_id)}
                </th>
                <td

                >
                  {formatCurrency(transaction.amount)}
                </td>
                <td

                >
                  {transaction.date}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
