import { useFetch } from "react-async"
import { Table, Row, Rows } from 'react-native-table-component';
import styles from '../Styles';

var host = 'http://192.168.100.34:3000'

/*
  Gives a table requesting data from the API-REST made in Golang
*/
export const QueryTable = ({ query }) => {
    const { data, error } = useFetch(`${host}${query}`, {
      headers: { accept: "application/json" },
    })
    if (error) return (<Text>{error.message}</Text>)
    if (data) {
        const theadData = Object.keys(data[0])
        let index = theadData.indexOf("ExpirationDate")
        theadData[index] = "Expires";
        theadData.shift()

        const tBodyData = data.map((row, index) => {
            let date = new Date(row.ExpirationDate)
            return [row.Name, date.toISOString().split('T')[0], row.Quantity]
        })
    
        return (
            <Table style={styles.tableStyle} borderStyle={styles.tableBorder} >
                <Row key={"head"} data={theadData}/>
                <Rows data={tBodyData} />
            </Table>
        );
    }
    return null
  }