const EmailsViewer = () => {
   const [displayEmails, setDisplayEmails] = React.useState([]);
   const [currentPage, setCurrentPage] = React.useState(0);
   const [totalPages, setTotalPages] = React.useState(0);
   const [providers, setProviders] = React.useState([]);
   const [selectedProvider, setSelectedProvider] = React.useState('all');
   const [sorter, setSorter] = React.useState('date');
   const [sortingDirection, setSortingDirection] = React.useState('desc');
   const [searchTerm, setSearchTerm] = React.useState('');
   const [selectedIds, setSelectedIds] = React.useState([]);
   const [selectedEmails, setSelectedEmails] = React.useState([]);
   const getApiUrl = () => {
      return `./backend/getEmails.php?page=${currentPage}&sort=${sorter}_${sortingDirection}${
         selectedProvider !== 'all' ? '&provider=' + selectedProvider : ''
      }${searchTerm !== '' ? '&search=' + searchTerm : ''}`;
   };
   const getInitialInfo = async () => {
      const intialResponse = await fetch(getApiUrl());
      if (!intialResponse) return;
      const res = await intialResponse.json();
      setTotalPages(res.pager.total_pages);
      setDisplayEmails(res.data);
      setCurrentPage(res.pager.current_page);
      const intialProviders = await fetch('./backend/getProviders.php');
      if (!intialProviders) return;
      const provRes = await intialProviders.json();
      setProviders(provRes.data.providers);
   };
   const loadData = async () => {
      const resp = await fetch(getApiUrl());
      if (!resp) return;
      const res = await resp.json();
      setCurrentPage(res.pager.current_page);
      setTotalPages(res.pager.total_pages);
      setDisplayEmails(res.data);
   };
   const deleteEmail = async (id) => {
      const deleteResponse = await fetch(`./backend/deleteEmail.php?id=${id}`);
      if (!deleteResponse) return;
      const delRes = await deleteResponse.json();
      if (delRes.message === 'fail') {
         alert('error deleting email with ID', id);
         return;
      }
      loadData();
   };
   React.useEffect(() => {
      getInitialInfo();
   }, []);
   React.useEffect(() => {
      loadData();
   }, [sortingDirection, sorter, selectedProvider, currentPage]);
   const downloadCSV = async () => {
      const csvMap = selectedEmails.map((em) => {
         return [em.email_string, em.email_provider, em.email_added];
      });
      let csvData = 'Email,Provider,Added\n';
      csvMap.forEach((row) => {
         csvData += row.join(',');
         csvData += '\n';
      });
      const csvElem = document.createElement('a');
      csvElem.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvData);
      csvElem.target = '_blank';
      csvElem.download = `csv_export_${new Date().getTime()}.csv`;
      csvElem.click();
   };
   const pages = [];
   for (let i = 0; i < totalPages; i++) {
      pages.push(i);
   }
   return (
      <div id="emailsBox">
         <div id="filterSelect" style={{ flexDirection: 'row' }}>
            <select onChange={(e) => setSelectedProvider(e.target.value)}>
               <option selected value={'all'}>
                  All providers
               </option>
               {providers.map((provider) => {
                  return <option value={provider}>{provider}</option>;
               })}
            </select>
            <select onChange={(e) => setSorter(e.target.value)}>
               <option value="email">Order by email</option>
               <option value="date">Order by date</option>
            </select>
            <select onChange={(e) => setSortingDirection(e.target.value)}>
               <option value="desc">Descending</option>
               <option value="asc">Ascending</option>
            </select>
            <input placeholder="Search here..." type="text" onChange={(e) => setSearchTerm(e.target.value)} />
            <button onClick={loadData}>Search</button>
         </div>
         <div id="pageSelect" style={{ flexDirection: 'row', marginTop: 10 }}>
            {pages.map((page) => {
               return (
                  <button
                     style={{ backgroundColor: page === currentPage ? 'gray' : 'lightgray' }}
                     onClick={() => setCurrentPage(page)}
                  >
                     {page + 1}
                  </button>
               );
            })}
         </div>
         <table>
            <tr>
               <th>email</th>
               <th>provider</th>
               <th>Date Added</th>
            </tr>
            {displayEmails.map((email) => {
               return (
                  <tr>
                     <td>{email.email_string}</td>
                     <td>{email.email_provider}</td>
                     <td>{email.email_added}</td>
                     <td>
                        <button onClick={() => deleteEmail(email.id)}>Delete</button>
                     </td>
                     <td>
                        <input
                           checked={selectedIds.includes(email.id)}
                           type="checkbox"
                           onChange={(e) => {
                              if (e.target.checked) {
                                 const newArr = [...selectedIds, email.id];
                                 const newEmails = [...selectedEmails, email];
                                 setSelectedIds(newArr);
                                 setSelectedEmails(newEmails);
                              } else {
                                 const newArr = selectedIds.filter((id) => id !== email.id);
                                 const newEmails = selectedEmails.filter((em) => em[0] !== email.id);
                                 setSelectedIds(newArr);
                                 setSelectedEmails(newEmails);
                              }
                           }}
                        ></input>
                     </td>
                  </tr>
               );
            })}
         </table>
         <div>
            <button
               onClick={() => {
                  setSelectedEmails([]);
                  setSelectedIds([]);
               }}
            >
               Deselect All
            </button>
            <button onClick={downloadCSV}>Export selected as .csv</button>
         </div>
      </div>
   );
};
