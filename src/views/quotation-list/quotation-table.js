import * as React from "react";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Table, Collapse, Button } from "antd";
import { TableProps } from "antd/lib/table";
import { render } from "react-dom";

import ShowMoreText from "react-show-more-text";

// @ts-ignore
import reqwest from "reqwest";

import "antd/dist/antd.css";

const { useState, useEffect } = React;
const { Panel } = Collapse;

const App = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [pagination, setPagination] = useState({});
    const [expanded, setexpanded] = useState(false);
    const customFetch = async(params = {}) => {
        console.log("params:", params);
        setIsLoading(true);
        const response = await reqwest({
            url: "https://randomuser.me/api",
            method: "get",
            data: {
                results: 100
            },
            type: "json"
        });
        console.log("response.results", response.results);
        let array = response.results.map(item => {
            item.email = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum consectetur tellus mi, ac euismod nisi suscipit vitae. Duis vehicula nibh quis felis tempor vulputate.'
            return item
        });
        setUserList(array);
        setIsLoading(false);
    };
    const showButton = () => {
        setexpanded(!expanded);
    };
    useEffect(() => {
        customFetch({});
    }, []);
    const executeOnClick = (isExpanded) => {
        console.log(isExpanded);
    };
    const columns = [{
            title: "Email",
            width: "100px",
            dataIndex: "email",
            render: (email) => ( <
                ShowMoreText lines = { 3 }
                more = { < ExpandMore / > }
                less = { < ExpandLess / > }
                className = "content-css"
                anchorClass = "my-anchor-css-class"
                onClick = { executeOnClick }
                expanded = { false }
                width = { 100 }
                truncatedEndingComponent = { "... " } >
                { email } <
                /ShowMoreText>
            )
        },
        {
            title: "Name",
            dataIndex: "name",
            sorter: (a, b) => (a.name.first > b.name.first ? 1 : -1),
            render: (name) => `${name.first} ${name.last}`,
            width: "20%"
        },
        {
            title: "Gender",
            dataIndex: "gender",
            filters: [
                { text: "Male", value: "male" },
                { text: "Female", value: "female" }
            ],
            width: "20%"
        }
    ];

    const handleTableChange: TableProps < any > ["onChange"] = (
        pagination,
        filters,
        sorter
    ) => {
        setPagination(pagination);
        customFetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters
        });
    };

    return ( <
        div >
        <
        Table columns = { columns }
        dataSource = { userList }
        loading = { isLoading }
        onChange = { handleTableChange }
        pagination = { pagination }
        rowKey = "email" /
        >
        <
        /div>
    );
};

const rootElement = document.getElementById("root");
render( < App / > , rootElement);