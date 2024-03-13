// import { Navigate } from "react-router-dom";
// import { UserContext } from "../UserContext";
// import { useContext } from "react";
// export default function AccountPage() {
//     const {ready,user} = useContext(UserContext);
//     if(ready && user) return <Navigate to={'/login'} />;
//   return (

//     <div>
//       <h1>Account page here{user?.name} </h1>
//     </div>
//   )
// }

import { useContext, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../Components/AccountNav.jsx";
import BookingsPage from "./BookingsPage.jsx";
import BookingPage from "./BookingPage.jsx";
import DashBoard from "../Components/DashBoard.jsx";
import ProfileCard from "../Components/ProfileCard.jsx";

export default function AccountPage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  const role = localStorage.getItem("role");

  async function logout() {
    await axios.post("http://localhost:5000/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (

    <div>
      <AccountNav />
      {/* <div></div> */}
      <div class="flex align-middle justify-center ">
  <div class="align-middle justify-center rounded overflow-hidden shadow-lg h-full">
    <div class="px-4 py-2 flex space-between gap-4 ">
      <p class="text-gray-700 text-sm ">User:</p>
      <p class="font-bold text-2xl mb-1">{user.name}</p>
      <p class="text-gray-700 text-sm mb-1">Email:</p>

      <p class="text-gray-700 text-xl">{user.email}</p>
      <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
    </div>
  </div>
</div>


      {subpage === "profile" && (
        <div>
          {/* Logged in as {user.name} ({user.email})<br /> */}

          {role === "vendor" && <DashBoard />}
         
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
      {subpage === "account/bookings" && <BookingsPage />}
      <BookingPage />
    </div>
  );
}
