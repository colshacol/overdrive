# Docs

---

## Form JSON Schemas

```javascript
{
  EmployeeID: {
    label: "Employee ID",
    width: 2,
    type: "text",
    isRequired: false,
  },
  RecordedDate: {
    label: "Recorded Date",
    width: 2,
    type: "date",
    isRequired: true,
  },
  CertificationDate: {
    label: "Certification Date",
    width: 2,
    type: "date",
    isRequired: true,
  },
  EffectiveDate: {
    label: "Effective Date",
    width: 2,
    type: "date",
    isRequired: true,
  },
  DocumentType: {
    label: "Document Type",
    width: 3,
    type: "text",
    isRequired: true,
  },
  DocumentName: {
    label: "Document Name",
    width: 3,
    type: "text",
    isRequired: true,
  },
  BookVolume: { label: "Volume", width: 2, type: "number", isRequired: true },
  Book: { label: "Book", width: 2, type: "text", isRequired: true },
  Page: { label: "Page", width: 2, type: "number", isRequired: true },
  Acreage: { label: "Acreage", width: 3, type: "number", isRequired: true },
  Grantor: { label: "Grantor", width: 6, type: "text", isRequired: true },
  Grantee: { label: "Grantee", width: 6, type: "text", isRequired: true },
  Conveyance: { label: "Conveyance", width: 6, type: "text", isRequired: true },
  CreatedDate: {
    label: "Created Date",
    width: 6,
    type: "date",
    isRequired: true,
  },
  Mapped: { label: "Mapped", width: 6, type: "text", isRequired: true },
  CreatedBy: { label: "Created By", width: 6, type: "text", isRequired: true },
}
```
