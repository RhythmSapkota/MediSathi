import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { HOSPITAL_LOCATION } from '../../../utils/constants';

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

const SearchButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  margin-left: 1rem;
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
        color: #e74c3c;
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
        display: none;
      }
    }
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
  margin-left: 1rem;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const HospitalTable = ({ hospitals }) => {
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchInput, setSearchInput] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [filteredHospitals, setFilteredHospitals] = useState([]);

  useEffect(() => {
    applyFilters(searchInput, locationFilter);
  }, [searchInput, locationFilter]);

  const handleDelete = (id) => {
    console.log(`Delete hospital with ID ${id}`);
    // You can add your delete logic here.
  };

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    applyFilters(searchInput, locationFilter);
  };

  const applyFilters = (search, location) => {
    const filtered = hospitals.filter((hospital) =>
      hospital.hospital.toLowerCase().includes(search.toLowerCase()) &&
      (location === '' || hospital.hospitalLocation.toLowerCase() === location.toLowerCase())
    );

    // Apply sorting based on the current sortOrder
    const sortedHospitals = [...filtered].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.hospital.localeCompare(b.hospital);
      } else {
        return b.hospital.localeCompare(a.hospital);
      }
    });

    setFilteredHospitals(sortedHospitals);
  };

  return (
    <TableWrapper>
      <div>
        <SearchInput
          type="text"
          placeholder="Search by hospital name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <SearchSelect
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="">All Locations</option>
          {Object.values(HOSPITAL_LOCATION).map((location, index) => (
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
      </div>
      <StyledTable>
        <thead>
          <tr>
            <th>Hospital Name</th>
            <th>No of Doctors</th>
            <th>Location</th>
            <th>Hospital Type</th>
            <th>Average Rating</th> {/* New column for average rating */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredHospitals.map((hospital) => (
            <tr key={hospital._id}>
              <td>{hospital.hospital}</td>
              <td>{hospital.doctors.length}</td>
              <td>{hospital.hospitalLocation}</td>
              <td>{hospital.hospitalType}</td>
              <td>{hospital.averageRating.toFixed(2)} {"("} <b>{"Total :"}</b> {` ${hospital.ratings.length} )`}</td> {/* Display average rating */}
              <td>
                <ActionIcons style={{ justifyContent: "left" }}>
                  <div className='actions' style={{ display: "flex" }} onClick={() => handleDelete(hospital._id)}>
                    <FontAwesomeIcon
                      icon={faTrash}
                    />
                    <p><b>Delete</b></p>
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

export default HospitalTable;
