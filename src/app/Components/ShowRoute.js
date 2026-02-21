"use client";

import React from "react";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

import { Box } from "@mui/material";

const Icon = styled(ArrowBackIosRoundedIcon)`
  margin: 0 8px;
  color: #333333;
  font-size: 15px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  margin: 10px 0 2px 0;
  list-style: none;
  flex-wrap: nowrap;
  overflow: hidden;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #404756;
  min-width: 0;
  &:not(:first-child) {
    margin-right: 7px;
  }
  a {
    text-decoration: none;
    min-width: 0;
  }
`;

const StyledLink = styled.span`
  text-decoration: none;
  color: #404756;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledLinkLast = styled(StyledLink)`
  display: block;
  max-width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    max-width: 130px;
  }
`;

const ShowRoute = () => {
  const pathname = usePathname();
  const [decodedPathname, setDecodedPathname] = useState("");
  
  useEffect(() => {
    setDecodedPathname(decodeURIComponent(pathname));
  }, [pathname]);

  // console.log(decodedPathname);
  const returnPath = decodedPathname.split("/").filter((value) => value);

  

  // Add "home" to the beginning of the path
  returnPath.unshift("خانه");

  // Function to generate the URL for each segment
  const generatePath = (index) => {
    if (index === 0) {
      return "/";
    }
    return "/" + returnPath.slice(1, index + 1).join("/");
  };

  return (
    <>
      <List>
        <Box
        component="li"
          sx={{
            width: 37,
            height: 37,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 1,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.02 2.84016L3.63 7.04016C2.73 7.74016 2 9.23016 2 10.3602V17.7702C2 20.0902 3.89 21.9902 6.21 21.9902H17.79C20.11 21.9902 22 20.0902 22 17.7802V10.5002C22 9.29016 21.19 7.74016 20.2 7.05016L14.02 2.72016C12.62 1.74016 10.37 1.79016 9.02 2.84016Z"
              stroke="#404756"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 17.9902V14.9902"
              stroke="#404756"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>
        {returnPath.map((segment, index) => {
          const isLast = index === returnPath.length - 1;
          return (
            <ListItem key={index}>
              <Link href={generatePath(index)} passHref>
                {isLast ? (
                  <StyledLinkLast title={segment}>{segment}</StyledLinkLast>
                ) : (
                  <StyledLink>{segment}</StyledLink>
                )}
              </Link>
              {!isLast && <Icon />}
            </ListItem>
          );
        })}
      </List>
     
    </>
  );
};

export default ShowRoute;
