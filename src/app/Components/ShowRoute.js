"use client";

import React from "react";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import CottageRoundedIcon from '@mui/icons-material/CottageRounded';

const HomeIcon = styled(CottageRoundedIcon)`
  fill: none;
  stroke: #404756;
  font-size:23px;
`;



const Icon = styled(ArrowBackIosRoundedIcon)`
  margin: 0 8px;
  color: #333333;
  font-size: 15px;
`;


const List = styled.ul`
  display: flex;
  flex-direction: row;
  align-items:center;
  padding: 0;
  margin: 10px 0 2px 0;
  list-style: none;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #404756;
  &:not(:first-child) {
    margin-right: 7px;
  }
  a{
    text-decoration:none
  }
`;

const StyledLink = styled.span`
  text-decoration: none;
  color: #404756;
  &:hover {
    text-decoration: underline;
  }
`;

const ShowRoute = () => {
  const pathname = usePathname();
  const returnPath = pathname.split("/").filter((value) => value);

  // Add "home" to the beginning of the path
  returnPath.unshift("home");

  // Function to generate the URL for each segment
  const generatePath = (index) => {
    if (index === 0) {
      return "/";
    }
    return "/" + returnPath.slice(1, index + 1).join("/");
  };

  return (
      <List>
        <HomeIcon/>
        {returnPath.map((segment, index) => (
          <ListItem key={index}>
            <Link href={generatePath(index)} passHref>
              <StyledLink>{segment}</StyledLink>
            </Link>
            {index < returnPath.length - 1 && <Icon />}
          </ListItem>
        ))}
      </List>
   
  );
};

export default ShowRoute;
