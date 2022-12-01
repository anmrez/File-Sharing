import { gql } from 'apollo-angular'


export const LOGIN = gql`
  mutation login( $pass: String! ) {
    login( password: $pass )
  }`


export const GET_FILES = gql`
  query files {
    files{
      name
      description
      storage_time
      number_downloads
    }
  }`


export const DELETE_FILE = gql`
  mutation delete( $fileName: String! ) {
    deleteFile( fileName: $fileName ) {
      status
      message
    }
  }`
