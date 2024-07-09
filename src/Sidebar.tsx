import { Box, capitalize, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React, { useState } from "react";

interface Department {
  department: string;
  sub_departments: string[];
}

const data: Department[] = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"],
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"],
  },
];

const Sidebar = () => {
  const [checked, setChecked] = useState(() => {
    const initialChecked = new Map<string, boolean>();
    data.forEach((dept) => {
      initialChecked.set(dept.department, false);
      dept.sub_departments.forEach((sub) => {
        initialChecked.set(`${dept.department}_${sub}`, false);
      });
    });
    return initialChecked;
  });

  const handleParentChange =
    (department: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;
      setChecked((prev) => {
        const newChecked = new Map(prev);
        newChecked.set(department, isChecked);
        data
          .find((d) => d.department === department)
          ?.sub_departments.forEach((sub) => {
            newChecked.set(`${department}_${sub}`, isChecked);
          });
        return newChecked;
      });
    };

  const handleChildChange =
    (department: string, subDepartment: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;
      setChecked((prev) => {
        const newChecked = new Map(prev);
        newChecked.set(`${department}_${subDepartment}`, isChecked);
        const allChecked =
          data
            .find((d) => d.department === department)
            ?.sub_departments.every((sub) =>
              newChecked.get(`${department}_${sub}`)
            ) ?? false;
        newChecked.set(department, allChecked);
        return newChecked;
      });
    };

  return (
    <Box
      sx={{
        width: "20%",
        height: "100vh",
        backgroundColor: "peru",
        border:'2px solid grey',
        borderRadius:2.7,
        px: 3,
        textTransform: 'capitalize',
        color:'white'
        

      }}
    >
      {data.map((department) => {
        const allChecked = department.sub_departments.every((sub) =>
          checked.get(`${department.department}_${sub}`)
        );
        const indeterminate =
          !allChecked &&
          department.sub_departments.some((sub) =>
            checked.get(`${department.department}_${sub}`)
          );
        return (
          <div key={department.department}>
            <FormControlLabel
              label={`${department.department} (${department.sub_departments.length})`}
              control={
                <Checkbox
                  checked={allChecked}
                  indeterminate={indeterminate}
                  onChange={handleParentChange(department.department)}
                />
              }
            />
            <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
              {department.sub_departments.map((sub) => (
                <FormControlLabel
                  key={sub}
                  label={sub}
                  control={
                    <Checkbox
                      checked={
                        checked.get(`${department.department}_${sub}`) ?? false
                      }
                      onChange={handleChildChange(department.department, sub)}
                    />
                  }
                />
              ))}
            </Box>
          </div>
        );
      })}
    </Box>
  );
};

export default Sidebar;
