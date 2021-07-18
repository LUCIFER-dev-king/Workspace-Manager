// import React from "react";
// import { Route, Redirect } from "react-router-dom";
// import { isAuthenticated } from "./helper/authHelper";

// const PrivateRoute = ({ component: Componenet, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated() ? (
//           <Componenet {...props} />
//         ) : (
//           <Redirect
//             to={{ pathname: "/signin", state: { from: props.location } }}
//           />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;
