import { HOSPITAL_LOCATION as locationsArray } from '../../../utils/constants.js';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const iconColor = '#3498db';

const TableWrapper = styled.div`
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-x: auto;


`;

const StyledTable = styled.table`
  width: 100%;
  margin-top: 10px;

  th,
  td {
    max-width: 1rem;
    border: 1px solid #e0e0e0;
    padding: 12px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  th {
    background-color: var(--tablehead-background-color);
    color: var(--text-secondary-color);
    // position: relative;
    cursor: pointer;
    user-select: none;
  }

  tr:nth-child(even) {
    background-color: var(--background-secondary-color);
  }

  tr:hover {
    background-color: var(--primary-500);
  }
`;

const SearchInput = styled.input`
  width: 40%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const SearchSelect = styled.select`
  width: 40%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-left:1rem;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const SearchButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  margin-left:1rem; 
  margin-bottom: 10px;

  &:hover {
    background-color: #2980b9;
  }
`;

const ActionIcons = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  .actions {
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      svg {
        color: #e74c3c; /* Change the color to red on hover */
      }
      p {
        color: #e74c3c;
      }
    }

    svg {
      font-size: 1.2rem;
      color: ${iconColor};
      margin-right: 8px;
    }





  }


  @media (max-width: 512px) {
    .actions {
        p {
           display:none;
          }
    }
  }

`;


const UsersTable = ({ users }) => {
  const [searchInput, setSearchInput] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleEdit = (id) => {
    console.log(`Edit user with ID ${id}`);
  };
  console.log(users,"check")
  if(!users){
    return null
  }
  const handleDelete = (id) => {
    console.log(`Delete user with ID ${id}`);
  };

  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);

    const filtered = users
      .filter((user) =>
        `${user.name} ${user.lastName}`.toLowerCase().includes(inputValue.toLowerCase()) &&
        user.location.toLowerCase().includes(locationFilter.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });

    setFilteredUsers(filtered);
  };

  const handleLocationFilterChange = (event) => {
    const locationValue = event.target.value;
    setLocationFilter(locationValue);

    const filtered = users
      .filter((user) =>
        `${user.name} ${user.lastName}`.toLowerCase().includes(searchInput.toLowerCase()) &&
        user.location.toLowerCase().includes(locationValue.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });

    setFilteredUsers(filtered);
  };

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    // Re-sort the filtered users array when the sort order changes
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setFilteredUsers(sortedUsers);
  };

  const handleLocationSelectChange = (event) => {
    const locationValue = event.target.value;
    setSelectedLocation(locationValue);

    const filtered = users
      .filter((user) =>
        `${user.name} ${user.lastName}`.toLowerCase().includes(searchInput.toLowerCase()) &&
        (locationValue === '' || user.location === locationValue)
      )
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });

    setFilteredUsers(filtered);
  };

  const handleReset = () => {
    setSearchInput('');
    setLocationFilter('');
    setSortOrder('asc');
    setSelectedLocation('');
    setFilteredUsers(users);
  };

  return (
    <TableWrapper>
      <div>
        <SearchInput
          type="text"
          placeholder="Search by name..."
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <SearchSelect
          value={selectedLocation}
          onChange={handleLocationSelectChange}
        >
          <option value="">All Locations</option>
          {Object.values(locationsArray).map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </SearchSelect>
        <SearchButton onClick={toggleSortOrder}>
          {sortOrder === 'asc' ? (
            <FontAwesomeIcon icon={faSortUp} />
          ) : (
            <FontAwesomeIcon icon={faSortDown} />
          )}
        </SearchButton>
        <SearchButton onClick={handleReset}>Reset</SearchButton>
      </div>
      <StyledTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Location</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.name} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.location}</td>
              <td>{user.role}</td>
              <td>
                <ActionIcons>
                    <div className='actions' style={{display:"flex"}} onClick={() => handleEdit(user._id)}>
                    <FontAwesomeIcon
                    icon={faEdit}
                    
                  />
                  <p style={{marginRight: "1rem"}}><b>Edit</b></p>
                    </div>

                    <div className='actions' style={{display:"flex"}} onClick={() => handleDelete(user._id)}>
                    <FontAwesomeIcon
                    icon={faTrash}
                
                  />
                  <p><b>Delete </b></p>
                        </div>

             
           
                </ActionIcons>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default UsersTable;
