import OneTable from "../tables/OneTable";

export default function TableList ({ tables }) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td>Table</td>
                        <td>Capacity</td>
                    </tr>
                </thead>
                <tbody>
                    {tables.map((table, _idx) => {
                       return <OneTable key={_idx} table={table} />
                    })}
                </tbody>
            </table>
        </div>
    )
};