// example using ApolloTableQL
// function QuestionsTable2 () {
//   const divStyle = {padding: '20px'};

//   return (
//   <div style={divStyle}>
//     <ApolloTableQL 

//           columns={['question_code', 'question_label', 'question_status', 'question_text', 'question_type', 'survey_type', 
//                 'standard',
//           {
//             component: function component(props){return React.createElement(EditButton, {question_code: props.question_code,
//                                                                                           question_label: props.question_label,
//                                                                                         question_status: props.question_status,
//                                                                                       question_text: props.question_text,
//                                                                                     question_type: props.question_type,
//                                                                                   survey_type: props.survey_type,
//                                                                                 standard: props.standard}, "Edit")},

//             customColumn: true,
//             id: 'Edit'
//           },
//           {
//           component: function component(props){return React.createElement(ResponseButton, {question_code: props.question_code}, "Responses")},

//           customColumn: true,
//           id: 'Responses'
//           }]}
//           query={AllQuestions}
//           pollInterval={1000}
//           pagination={
//           {
//           pageLimit: 10,
//           pageNeighbours: 2,
//           currentPage: 1,
//           onPageChanged: (currentPage, totalPages, pageLimit, totalRecords) => {
//             console.log(currentPage)
//           }}
//           }/>
//           </div>
//             )
//           }