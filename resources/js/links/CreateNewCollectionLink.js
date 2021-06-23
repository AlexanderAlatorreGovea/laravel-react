import React, { useState } from "react";
import {
    TitleBar,
    useRoutePropagation,
    ResourcePicker
} from "@shopify/app-bridge-react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";

const CreateNewCollectionLink = () => {
    const location = useLocation();
    const history = useHistory();
    const [resourcePickerOpen, setResourcePickerOpen] = useState(true);
    const [collectionData, setCollectionData] = useState(false);
    const [formText, setFormText] = useState({
        discountCode: "",
        campaignSource: "",
        campaignMedium: "",
        campaignName: "",
        campaignTerm: "",
        campaignContent: ""
    });

    useRoutePropagation(location);

    const slugify = text =>
        text
            .toString()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/--+/g, "-");

    const handleResourcePicker = resource => {
        axios
            .post("/app/graphql", {
                query: `{
                       collection(id: "${resource.selection[0].id}") {
                           title
                       }
                    }`
            })
            .then(function(response) {
                const collectionInfo = {
                    ...resource.selection[0],
                    collectionUrl: `https://shoparoe.myshopify.com/collections/${slugify(
                        response.data.collection.title
                    )}`
                };

                setCollectionData(collectionInfo);
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    const handleText = (name, text) => {
        const newState = {
            [name]: text
        };

        setFormText({
            ...formText,
            ...newState
        });
        console.log(formText);
    };

    return (
        <>
            <TitleBar title="Create New Collection Link" />
            <ResourcePicker
                resourceType="Collection"
                open={resourcePickerOpen}
                onSelection={handleResourcePicker}
                onCancel={() => history.push("/app")}
            />
            <div className={`app-page-title ${collectionData ? "" : "d-none"}`}>
                <div className="page-title-wrapper">
                    <div className="page-title-heading">
                        <div className="page-title-icon">
                            <i className="pe-7s-display1 icon-gradient bg-premium-dark"></i>
                        </div>
                        <div>
                            Create New Collection Link
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
            {collectionData && (
                <Content
                    collectionData={collectionData}
                    handleText={handleText}
                    formText={formText}
                />
            )}
        </>
    );
};

function UrlPreview({ formText, collectionData, domainUrl, slug }) {
    if (formText.discountCode == "") {
        return (
            <>
                <div className="position-relative form-group">
                    {`${collectionData.collectionUrl}?${
                        formText.campaignSource == ""
                            ? ""
                            : `utm_source=${formText.campaignSource.replace(
                                  / /g,
                                  "%20"
                              )}`
                    }${
                        formText.campaignMedium == ""
                            ? ""
                            : `&utm_medium=${formText.campaignMedium.replace(
                                  / /g,
                                  "%20"
                              )}`
                    }${
                        formText.campaignName == ""
                            ? ""
                            : `&utm_campaign=${formText.campaignName.replace(
                                  / /g,
                                  "%20"
                              )}`
                    }${
                        formText.campaignTerm == ""
                            ? ""
                            : `&utm_term=${formText.campaignTerm.replace(
                                  / /g,
                                  "%20"
                              )}`
                    }${
                        formText.campaignContent == ""
                            ? ""
                            : `&utm_campaign=${formText.campaignContent.replace(
                                  / /g,
                                  "%20"
                              )}`
                    }`}
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="position-relative form-group">
                    {`${domainUrl}/discount/${
                        formText.discountCode
                    }?redirect=%2Fcollections%2F${slug}${
                        formText.campaignSource == ""
                            ? ""
                            : `&utm_source=${formText.campaignSource.replace(
                                  / /g,
                                  "%20"
                              )}`
                    }${
                        formText.campaignMedium == ""
                            ? ""
                            : `&utm_medium=${formText.campaignMedium.replace(
                                  / /g,
                                  "%20"
                              )}`
                    }${
                        formText.campaignName == ""
                            ? ""
                            : `&utm_campaign=${formText.campaignName.replace(
                                  / /g,
                                  "%20"
                              )}`
                    }${
                        formText.campaignTerm == ""
                            ? ""
                            : `&utm_term=${formText.campaignTerm.replace(
                                  / /g,
                                  "%20"
                              )}`
                    }${
                        formText.campaignContent == ""
                            ? ""
                            : `&utm_campaign=${formText.campaignContent.replace(
                                  / /g,
                                  "%20"
                              )}`
                    }`}
                </div>
            </>
        );
    }
}

const Content = ({ collectionData, formText, handleText }) => {
    const domainUrl = `${collectionData.collectionUrl}`.match(
        /^(?:\/\/|[^\/]+)*/
    )[0];
    const slug = `${collectionData.collectionUrl}`.match(/[^\/]+$/)[0];
    return (
        <>
            <div className={`row ${collectionData ? "" : "d-none"}`}>
                <div className="col-md-6">
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <h5 className="card-title">Controls Types</h5>
                            <form className>
                                <div className="position-relative form-group">
                                    <label htmlFor="collectionUrl">
                                        collection URL
                                    </label>
                                    <input
                                        defaultValue={
                                            collectionData.collectionUrl
                                        }
                                        name="collectionUrl"
                                        id="collectionUrl"
                                        placeholder="collection URL"
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="position-relative form-group">
                                    <label htmlFor="discountCode">
                                        Discount Code
                                    </label>
                                    <input
                                        onChange={event =>
                                            handleText(
                                                "discountCode",
                                                event.target.value
                                            )
                                        }
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
                                        onChange={event =>
                                            handleText(
                                                "campaignSource",
                                                event.target.value
                                            )
                                        }
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
                                        onChange={event =>
                                            handleText(
                                                "campaignMedium",
                                                event.target.value
                                            )
                                        }
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
                                        onChange={event =>
                                            handleText(
                                                "campaignName",
                                                event.target.value
                                            )
                                        }
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
                                        onChange={event =>
                                            handleText(
                                                "campaignTerm",
                                                event.target.value
                                            )
                                        }
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
                                        onChange={event =>
                                            handleText(
                                                "campaignContent",
                                                event.target.value
                                            )
                                        }
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
                                        src={`${collectionData.image.originalSrc}`}
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="col-md-8 d-flex align-items-center">
                                    <h2>{collectionData.title}</h2>
                                </div>
                            </div>
                            <h5 className="card-title">Link Preview</h5>
                            <div className="position-relative form-group">
                                <UrlPreview
                                    collectionData={collectionData}
                                    formText={formText}
                                    domainUrl={domainUrl}
                                    slug={slug}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateNewCollectionLink;
