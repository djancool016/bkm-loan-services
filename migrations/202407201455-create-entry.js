module.exports = {
    tableName: "entry",
    timestamp: false,
    columns: [
        {
            columnName: "id",
            dataType: "INT",
            nullable: false,
            autoIncrement: true
        },
        {
            columnName: "registerId",
            dataType: "INT",
            nullable: false,
            references: {table:'register', key:'id'}
        },
        {
            columnName: "coaCode",
            dataType: "INT",
            nullable: false,
            references: {table: 'coa', key: 'code'}
        },
        {
            columnName: "dc",
            dataType: "TINYINT(1)",
            nullable: false
        }
    ]
}

