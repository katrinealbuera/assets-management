class FieldName {
    Specs = 'Specification';
    Details = 'Details';
    Acctg = 'Accounting';

    Name = 'Name';

    // Common
    Model = 'Model';
    Manufacturer = 'Manufacturer';
    AssetTag = 'Asset Tag';
    Category = 'Category';
    Status = 'Status';
    AssignedTo = 'Assigned To';
    IP = 'IP Address';
    Notes = 'Notes';
    Warranty = 'Warranty';
    PO = 'Purchase Order (PO)';
    Receipt = 'Delivery Receipt (DR)';
    Invoice = 'Sales Invoice (SI)';
    DDate = 'Delivery Date';
    PCost = 'Purchase Cost';
    PDate = 'Purchase Date';
    Supplier = 'Supplier';

    // LAPTOP: Specification
    SN = 'Serial Number';
    BatterySN = 'Battery Serial Number';
    MonitorSN = 'Monitor Serial Number';
    AdapterSN = 'Adapter Serial Number';
    CPU = 'CPU';
    RAM = 'RAM';
    DISK = 'Disk';
    Videocard = 'Video Card';
    MAC = 'MAC Address';
    OS = 'OS Version';
    LicenseKey = 'License Key';

    // LAPTOP: Details
    HostName = 'Host Name';

    // MONITOR: Specification
    MonitorSN = 'Monitor Serial Number';

    // MONITOR: Details
    AssetName = 'Asset Name';

    GBUnit = 'GB';
}

export default {
    FieldName: new FieldName(),
}