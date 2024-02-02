import React, { useEffect, useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import UsersTable from '../components/UsersTable';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import Error from './Error';

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/users');
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    throw error; // Re-throw the error so that React Router can handle it
  }
};

const ManageUsers = () => {
  const {users} = useLoaderData(); // Change to use 'data' directly
console.log(users,"checkkkk") // Update 'users' when 'data' changes

  if (!users) {
    return <Error />;
  }

  return (
    <div>
      <UsersTable users={users} />
    </div>
  );
};

export default ManageUsers;
