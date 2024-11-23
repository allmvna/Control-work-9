import Layout from "../../UI/Layout/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import {Alert} from "@mui/material";
import MainPage from "../MainPage/MainPage.tsx";
import Category from "../Category/Category.tsx";
import FormCategory from "../../components/FormCategory/FormCategory.tsx";
import FormTransaction from "../../components/FormTransaction/FormTransaction.tsx";

const Tracker = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<MainPage/>} />
                <Route path="/categories" element={<Category />} />
                <Route path="/:id/edit" element={<FormCategory/>} />
                <Route path="/:id/edit" element={<FormTransaction/>} />
                <Route
                    path="*"
                    element={<Alert severity="error">Not found</Alert>}
                />
            </Routes>
        </Layout>
    );
};

export default Tracker;
