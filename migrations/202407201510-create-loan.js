module.exports = {
    tableName: "loan",
    timestamp: true,
    columns: [
        {
            columnName: "id",
            dataType: "INT",
            nullable: false,
            autoIncrement: true
        },
        {
            columnName: "ksmId",
            dataType: "INT",
            nullable: false,
            references: {table: 'ksm', key: 'id'}
        },
        {
            columnName: "amount",
            dataType: "INT",
            nullable: false
        },
        {
            columnName: "interestRate",
            dataType: "DECIMAL(5,2)",
            nullable: false
        },
        {
            columnName: "duration",
            dataType: "TINYINT", // duration in month
            nullable: false
        },
        {
            columnName: "startDate",
            dataType: "DATE",
            nullable: false
        },
        {
            columnName: "status",
            dataType: "ENUM('pending', 'approved', 'rejected', 'active', 'closed')",
            nullable: false,
            default: 'pending',
        }
    ]
}
