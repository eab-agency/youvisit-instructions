import React from "react";
import "./App.css";
// import { gql, useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import Instruction from "./components/Instructions";

// const InstructionID = ({ institutionID }) => {
//   const { loading, error, data, refetch } = useQuery(query, {
//     variables: { institutionID },
//   });
//   if (loading) return <p>Loading Institution...</p>;
//   if (error) return `Error! ${error}`;

//   return (
//     <div>
//       <code>{JSON.stringify(data, null, 4)}</code>
//       Your ID is: {institutionID}
//       <button onClick={() => refetch()}>Refetch!</button>
//     </div>
//   );
// };

const App = () => {
  const { search } = useLocation();
  const { id } = queryString.parse(search);
  console.log("institutionID", id);

  return (
    <>
      <section className="App">
        <Instruction institutionID={id} />
      </section>
    </>
  );
};

export default App;

// export const query = gql`
//   query Institution($institutionID: String!) {
//     institutions(instID: $institutionID) {
//       locations {
//         loc_id
//         name
//         experience_type
//         cover_photo {
//           thumb
//           full
//         }
//         stops {
//           stopid
//           title
//           panoramas {
//             smallurl
//             thumburl
//           }
//         }
//       }
//       name
//       inst_id
//     }
//   }
// `;
