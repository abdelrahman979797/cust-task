

export default function Filter({ filter, setFilter }) {
  return (
    <div
    >
      <form>
        <div className="input-group  justify-content-center d-flex mb-5"> 
          <label htmlFor="filterData" className="mainH2 input-group-text ">Search By Name / Amount</label>
        <input
          id="filterData"
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
            class="input-group-text  justify-content-center d-flex mainH2" aria-label="Username" aria-describedby="basic-addon1"
        /></div>
      
      </form>
    </div>
  );
}
