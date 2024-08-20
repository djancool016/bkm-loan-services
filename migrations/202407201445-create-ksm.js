module.exports = {
    tableName: "ksm",
    timestamp: true,
    columns: [
        {
            columnName: "id",
            dataType: "INT",
            nullable: false,
            autoIncrement: true
        },
        {
            columnName: "name",
            dataType: "VARCHAR(100)",
            nullable: false,
            unique: true
        },
        {
            columnName: "rw",
            dataType: "TINYINT",
            nullable: false
        }
    ]
}
