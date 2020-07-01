import React, { useState } from 'react';
import { ApolloTableQL } from 'react-tableql'
import {
  useTable,
  useGroupBy,
  useSortBy,
  useExpanded,
  usePagination,
  useFilters, 
  useGlobalFilter,
} from 'react-table'
//import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
// import css
import { useQuery } from '@apollo/react-hooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
// import components
import EditButton from './editButton.js'
import InputGroup from 'react-bootstrap/InputGroup'
import ResponseButton from './responseButton.js'
// import responsesModal from './responsesModal.js'
// import queries
import AllQuestions from '../queries/questions.js'
// eternal packages
import matchSorter from 'match-sorter'


function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length

  return (
    <span>
      Search:{' '}
      <input
        value={globalFilter || ''}
        onChange={e => {
          setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  )
}


// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input style={{width: 130}}
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`${count} records...`}
    />
  )
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {String(option)}
        </option>
      ))}
    </select>
  )
}


function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val



function ActualTable ({columns, rowdata, refetch, updateQuery}) {

  const butStyle = {margin: 10}

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const data = React.useMemo(() => rowdata)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({
    columns,
    data,
    defaultColumn,
    filterTypes,
    initialState: { pageIndex: 0 },
  },
  useFilters,
  useGlobalFilter,
  usePagination
  )


  return (
    <div>
    <Table {...getTableProps()} responsive>
    <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}
                
                <div>{column.canFilter ? column.render('Filter') : null}</div>

                </th>
              ))}
              <th>Edit</th>
              <th>Responses</th>
            </tr>
          ))}
        </thead>

      <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {

                  if (typeof(cell.value) === 'boolean') 

                    return <td>{String(cell.value)}</td>
                    else 
                  
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>

                  
                })}

                <td><EditButton question_code={String(row.cells[0].value)} question_label={String(row.cells[1].value)} 
                          question_status={String(row.cells[2].value)} question_text={String(row.cells[3].value)}
                          question_type={String(row.cells[4].value)} survey_type={String(row.cells[5].value)}
                          standard={String(row.cells[6].value)} refetch={refetch} updateQuery={updateQuery} gotoPage={gotoPage}
                          pageIndex={pageIndex}
                /></td>
                <td><ResponseButton question_code={String(row.cells[0].value)} question_type={String(row.cells[4].value)}/></td>
              </tr>
              
            )
          })}
        </tbody>
    </Table>

    <div style={{display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',}} className="pagination">
        <Button style={butStyle} variant="outline-secondary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </Button>{' '}
        <Button style={butStyle} variant="outline-secondary" onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </Button>{' '}

          <span style={{left: '10%', right: '10%'}}>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>

        <Button style={butStyle} variant="outline-secondary" onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </Button>{' '}
        <Button style={butStyle} variant="outline-secondary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </Button>{' '}
        
        
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select style={{marginLeft: 10}}
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        
      </div>



   </div>
  )
}





// using pure react table
function QuestionsTable ({Querydata, refetch, updateQuery}) {
  const divStyle = {padding: '20px'};

  const columns = React.useMemo(
    () => [
      {
        Header: 'Question Code',
        accessor: 'question_code'
    },
    {
      Header: 'Question Label',
      accessor: 'question_label'
    },
    {
      Header: 'Question Status',
      accessor: 'question_status',
      Filter: SelectColumnFilter,
    },
    {
      Header: 'Question Text',
      accessor: 'question_text'
    },
    {
      Header: 'Question Type',
      accessor: 'question_type',
      Filter: SelectColumnFilter,
    },
    {
      Header: 'Survey Type',
      accessor: 'survey_type',
      Filter: SelectColumnFilter,
    },
    {
      Header: 'Standard',
      accessor: 'standard',
      Filter: SelectColumnFilter,
    },
    ]
  )

    return (
    <div style={divStyle}>

      <ActualTable rowdata={Querydata.consumer_questioninfo} columns={columns} refetch={refetch} updateQuery={updateQuery}/>

    </div>
  )
};


export default QuestionsTable;


