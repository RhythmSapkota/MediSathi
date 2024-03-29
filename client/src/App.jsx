import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Register,
  DashboardLayout,
  Login,
  Error,
  AddHospital,
  AllHospitals,
  Stats,
  Profile,
  Booking,
  Admin,
  MyBookings,
  AppointmentForm,
  DoctorDailySession,
  Daily,
  ManageUsers,
  ManageHospitals
} from "./pages";
import { checkDefaultTheme } from "./utils/DefaultTheme";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { action as addHospitalAction } from "./pages/AddHospital";
import { loader as AllHospitalsLoader } from "./pages/AllHospitals";
import { loader as bookingLoader } from "./pages/Booking";
import { action as bookingAction } from "./pages/Booking";
import { loader as myBookingsLoader } from "./pages/MyBookings";
import { loader as doctorDailySessionLoader } from "./pages/DoctorDailySession";
import {loader as manageUsersLoader} from "./pages/ManageUsers";
import {loader as manageHospitalsLoader} from "./pages/ManageHospitals"



checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index:true,
            element: <AllHospitals />,
            loader: AllHospitalsLoader,
          },
  
          {
            path: "stats",
            element: <Stats />,
          },
          {
            path: "daily-sessions",
            element: <Daily/>,
            children: [
              {
                 index:true,
                element: <DoctorDailySession />,
                loader: doctorDailySessionLoader,
              },
              {
                path: "appointmentreport",
                element: <AppointmentForm />,
              },
            ],
          },

     
          {
            path: "profile",
            element: <Profile />,
            children: [
              {
                path: "mybookings",
                element: <MyBookings />,
                loader: myBookingsLoader,
              },
            ],
          },
          
          {
            path: "admin",
            element: <Admin />, 
            children:[{
              index:true,
              element:<ManageUsers/>,
              loader: manageUsersLoader,
            },
              {
                path:"add-hospital",
                  element: <AddHospital />,
                  action: addHospitalAction,
                },
                {
                  path:"manage-hospitals",
                  element:<ManageHospitals/>,
                  loader:manageHospitalsLoader
                }
            ]
          },
          {
            path: "booking/:id",
            element: <Booking />,
            loader: bookingLoader,
            action: bookingAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
