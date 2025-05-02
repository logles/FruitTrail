// client/src/api/treeAPI.ts
import { gql } from '@apollo/client';

export const GET_TREES = gql`
  query Trees {
    trees {
      _id
      name
      fruit
      location { latitude longitude }
      createdBy { _id username }
    }
  }
`;

export const ADD_TREE = gql`
  mutation AddTree($name:String!,$fruit:String!,$lat:Float!,$lng:Float!){
    addTree(name:$name, fruit:$fruit, latitude:$lat, longitude:$lng) {
      _id name fruit location{latitude longitude} createdBy{_id username}
    }
  }
`;

export const UPDATE_TREE = gql`
  mutation UpdateTree($id:ID!,$name:String,$fruit:String){
    updateTree(id:$id, name:$name, fruit:$fruit) {
      _id name fruit location{latitude longitude}
    }
  }
`;

export const DELETE_TREE = gql`
  mutation DeleteTree($id:ID!) { deleteTree(id:$id) }
`;


//this folder can be graphql folder if needed.