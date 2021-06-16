import React, { useState } from "react";
import {
    TitleBar,
    useRoutePropagation,
    ResourcePicker
} from "@shopify/app-bridge-react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const CreateNewProductLink = () => {
    const location = useLocation();

    useRoutePropagation(location);

    const [resourcePickerOpen, setResourcePickerOpen] = useState(true);
    const [productData, setProductData] = useState(false);
    const [formText, setFormText] = useState({
        discountCode: '',
        campaignSource: '',
        campaignMedium: '',
        campaignName: '',
        campaignTerm: '',
        campaignContent: ''
    });

    const handleResourcePicker = resource => {
        setProductData(resource.selection[0]);

        axios
            .post("/app/graphql", {
                query: `{
                        product(id: "${resource.selection[0].id}") {
                            title
                            description
                            onlineStoreUrl
                        }
                    }`
            })
            .then(function(response) {
                const productInfo = {
                    ...resource.selection[0],
                    productUrl: response.data.product.onlineStoreUrl
                };
            
                setProductData(productInfo);
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    const handleText = (name, text) => {
        const newState = {
            [name]: text
        }

        setFormText({
            ...formText,
            ...newState
        })
        console.log(formText)
    }

    //const domainUrl = `${productData.productUrl}`.match(/^(?:\/\/|[^\/]+)*/)[0];
    //const slug = `${productData.productUrl}`.match(/[^\/]+$/)[0];

    return (
        <>
            <TitleBar title="Create New Link" />
            <ResourcePicker
                resourceType="Product"
                open={resourcePickerOpen}
                onSelection={handleResourcePicker}
            />
            <div className={`app-page-title ${productData ? "" : "d-none"}`}>
                <div className="page-title-wrapper">
                    <div className="page-title-heading">
                        <div className="page-title-icon">
                            <i className="pe-7s-display1 icon-gradient bg-premium-dark"></i>
                        </div>
                        <div>
                            Form Controls
                            <div className="page-title-subheading">
                                Wide selection of forms controls, using the
                                Bootstrap 4 code base, but built with React.
                            </div>
                        </div>
                    </div>
                    <div className="page-title-actions">
                        <button
                            type="button"
                            data-toggle="tooltip"
                            title="Example Tooltip"
                            data-placement="bottom"
                            className="btn-shadow mr-3 btn btn-dark"
                        >
                            <i className="fa fa-star"></i>
                        </button>
                        <div className="d-inline-block dropdown">
                            <button
                                type="button"
                                className="btn-shadow dropdown-toggle btn btn-info"
                            >
                                <span className="btn-icon-wrapper pr-2 opacity-7">
                                    <i className="fa fa-business-time fa-w-20"></i>
                                </span>
                                Buttons
                            </button>
                            <div
                                role="menu"
                                className="dropdown-menu dropdown-menu-right"
                            >
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <a href="#;" className="nav-link">
                                            <i className="nav-link-icon lnr-inbox"></i>
                                            <span>Inbox</span>
                                            <div className="ml-auto badge badge-pill badge-secondary">
                                                86
                                            </div>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#;" className="nav-link">
                                            <i className="nav-link-icon lnr-book"></i>
                                            <span>Book</span>
                                            <div className="ml-auto badge badge-pill badge-danger">
                                                5
                                            </div>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#;" className="nav-link">
                                            <i className="nav-link-icon lnr-picture"></i>
                                            <span>Picture</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            disabled
                                            href="#;"
                                            className="nav-link disabled"
                                        >
                                            <i className="nav-link-icon lnr-file-empty"></i>
                                            <span>File Disabled</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
            {productData &&  <Content productData={productData} handleText={handleText} formText={formText}/>}
       
        </>
    );
};

const Content = ({productData, formText, handleText}) => {
 
    return (
        <>
            <div className={`row ${productData ? "" : "d-none"}`}>
                <div className="col-md-6">
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <h5 className="card-title">Controls Types</h5>
                            <form className>
                                <div className="position-relative form-group">
                                    <label htmlFor="productUrl">
                                        Product URL
                                    </label>
                                    <input
                                        defaultValue={productData.productUrl}
                                        name="productUrl"
                                        id="productUrl"
                                        placeholder="Product URL"
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="position-relative form-group">
                                    <label htmlFor="discountCode">
                                        Discount Code
                                    </label>
                                    <input
                                        onChange={(event) => handleText('discountCode', event.target.value)}
                                        value={formText.discountCode}
                                        name="discountCode"
                                        id="discountCode"
                                        placeholder="50JULY4, 2021XMAS"
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="position-relative form-group">
                                    <label htmlFor="campaignSource">
                                        Campaign Source
                                    </label>
                                    <input
                                        value={formText.campaignSource}
                                        name="campaignSource"
                                        id="campaignSource"
                                        onChange={(event) => handleText('campaignSource', event.target.value)}
                                        placeholder="Google, Youtube, Instagram"
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="position-relative form-group">
                                    <label htmlFor="campaignMedium">
                                        Campaign Medium
                                    </label>
                                    <input
                                        name="campaignMedium"
                                        id="campaignMedium"
                                        placeholder="CPC, Banner, Instagram Profile Link"
                                        type="text"
                                        onChange={(event) => handleText('campaignMedium', event.target.value)}
                                        value={formText.campaignMedium}
                                        className="form-control"
                                    />
                                </div>
                                <div className="position-relative form-group">
                                    <label htmlFor="campaignName">
                                        Campaign Name
                                    </label>
                                    <input
                                        value={formText.campaignName}
                                        name="campaignName"
                                        onChange={(event) => handleText('campaignName', event.target.value)}
                                        id="campaignName"
                                        placeholder="50July42020, Labor Day 2020, COUPON234KID"
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="position-relative form-group">
                                    <label htmlFor="campaignTerm">
                                        Campaign Term (Optional)
                                    </label>
                                    <input
                                        value={formText.campaignTerm}
                                        onChange={(event) => handleText('campaignTerm', event.target.value)}
                                        name="campaignTerm"
                                        id="campaignTerm"
                                        placeholder="Add Paid Keywords"
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="position-relative form-group">
                                    <label htmlFor="campaignContent">
                                        Campaign Content
                                    </label>
                                    <input
                                        value={formText.campaignContent} 
                                        name="campaignContent"
                                        id="campaignContent"
                                        onChange={(event) => handleText('campaignContent', event.target.value)}
                                        placeholder="Girl With Laptop Image Ad, Image3, Banner 5"
                                        type="text"
                                        className="form-control"
                                    />
                                </div>

                                <button className="mt-1 btn btn-primary">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <h5 className="card-title">Converse</h5>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <img
                                        src={`${productData.images[0].originalSrc}`}
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="col-md-8 d-flex align-items-center">
                                    <h2>{productData.title}</h2>
                                </div>
                            </div>
                            <h5 className="card-title">Link Preview</h5>
                            <div className="position-relative form-group">
                                <textarea
                                    name="discountCode"
                                    id="discountCode"
                                    disabled
                                    type="text"
                                    className="form-control"
                                    value={`${productData.productUrl}?utm_source=${formText.discountCode}&utm_source=${formText.campaignSource}&utm_source=${formText.campaignMedium}&utm_source=${formText.campaignName}&utm_source=${formText.campaignTerm}&utm_source=${formText.campaignContent}&utm_source=${formText.campaignContent}`}
                                >
                                </textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateNewProductLink;
