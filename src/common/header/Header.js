import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import Button from "@material-ui/core/Button";
import Modal from "react-modal";
import { Tabs, Tab } from "@material-ui/core";
import Login from "../Login";
import Register from "../Register";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
    background: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
}));

Modal.setAppElement("#root");

export default function Header(props) {

    const classes = useStyles();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);
    const [isLoggedOut, setIsLoggedOut] = useState("");
    const history = useHistory();


    const handleChange = (event, newValue, index) => {
        setSelectedTab(newValue);
    };

    let user = JSON.parse(localStorage.getItem("user-info"));
    console.log("logged In user");
    console.log(user);

    function logout(e) {
        localStorage.clear();
        history.push("/");
        setIsLoggedOut(true);
    }

    useEffect(() => {
        setIsLoggedOut(false);
    }, [isLoggedOut]);

    return (
        <div className="header">
        <span>
            <img src={logo} className="movieLogo" alt="logo" />
        </span>

        {!localStorage.getItem("user-info") ? (
            <span className="btn">
            <Button
                id="login-btn"
                variant="contained"
                color="default"
                onClick={() => setModalIsOpen(true)}
            >
                Login
            </Button>
            </span>
        ) : (
            <span>
            <span className="logout-btn">
                <Button
                id="logout-btn"
                variant="contained"
                color="default"
                onClick={logout}
                >
                Logout
                </Button>
            </span>
            </span>
        )}
        <Modal
            isOpen={modalIsOpen}
            shouldCloseOnOverlayClick={true}
            onRequestClose={() => setModalIsOpen(false)}
            className={classes.paper}
        >
            <Tabs value={selectedTab} onChange={handleChange}>
            <Tab label="LOGIN" />
            <Tab label="REGISTER" />
            </Tabs>

            <TabPanel value={selectedTab} index={0}>
            <Login />
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
            <Register />
            </TabPanel>
        </Modal>
        </div>
    );
}

function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && <div>{children}</div>}</div>;
}
