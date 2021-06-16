import React, { useState, useEffect } from "react";
import { TitleBar, useRoutePropagation } from "@shopify/app-bridge-react";
import { useLocation } from "react-router-dom";

const ShowAllLinks = () => {
    const location = useLocation();

    useRoutePropagation(location);
    return (
        <>
            <TitleBar title="Show All Links" />
            <div class="app-page-title">
                <div class="page-title-wrapper">
                    <div class="page-title-heading">
                        <div class="page-title-icon">
                            <i class="pe-7s-display1 icon-gradient bg-premium-dark"></i>
                        </div>
                        <div>
                            Form Controls
                            <div class="page-title-subheading">
                                Wide selection of forms controls, using the
                                Bootstrap 4 code base, but built with React.
                            </div>
                        </div>
                    </div>
                    <div class="page-title-actions">
                        <button
                            type="button"
                            data-toggle="tooltip"
                            title="Example Tooltip"
                            data-placement="bottom"
                            class="btn-shadow mr-3 btn btn-dark"
                        >
                            <i class="fa fa-star"></i>
                        </button>
                        <div class="d-inline-block dropdown">
                            <button
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                class="btn-shadow dropdown-toggle btn btn-info"
                            >
                                <span class="btn-icon-wrapper pr-2 opacity-7">
                                    <i class="fa fa-business-time fa-w-20"></i>
                                </span>
                                Buttons
                            </button>
                            <div
                                tabIndex="-1"
                                role="menu"
                                aria-hidden="true"
                                class="dropdown-menu dropdown-menu-right"
                            >
                                <ul class="nav flex-column">
                                    <li class="nav-item">
                                        <a
                                            href="#;"
                                            class="nav-link"
                                        >
                                            <i class="nav-link-icon lnr-inbox"></i>
                                            <span>Inbox</span>
                                            <div class="ml-auto badge badge-pill badge-secondary">
                                                86
                                            </div>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a
                                            href="#;"
                                            class="nav-link"
                                        >
                                            <i class="nav-link-icon lnr-book"></i>
                                            <span>Book</span>
                                            <div class="ml-auto badge badge-pill badge-danger">
                                                5
                                            </div>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a
                                            href="#;"
                                            class="nav-link"
                                        >
                                            <i class="nav-link-icon lnr-picture"></i>
                                            <span>Picture</span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a
                                            disabled
                                            href="#;"
                                            class="nav-link disabled"
                                        >
                                            <i class="nav-link-icon lnr-file-empty"></i>
                                            <span>File Disabled</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShowAllLinks;
