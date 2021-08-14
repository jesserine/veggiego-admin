import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebaseDb from '../../../firebase'
import { storage } from '../../../firebase'
import { v4 as uuid } from 'uuid'

import PageTitle from "../../layouts/PageTitle";
import { SplitButton, ButtonGroup, Dropdown } from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { set } from "date-fns";

const OrdersForm = (props) => {
    const initialFieldValues = {
        notes: '',
        dateAdded: new Date().toLocaleString(),
    }

    var [values, setValues] = useState(initialFieldValues)
    var [unitObjects, setUnitObjects] = useState({})
    var [product, setProduct] = useState('');
    var [result, setResult] = useState([]);
    var [value, setValue] = useState('');


    useEffect(() => {
        if (value.length > 0) {
            firebaseDb.ref('products/').on('value', (snapshot) => {
                if (snapshot.val() != null) {
                    const productsDb = snapshot.val()
                    setResult([])
                    let searchQuery = value.toLowerCase();
                    for (let id in productsDb) {
                        let fruit = productsDb[id].productName.toLowerCase();
                        if (fruit.slice(0, searchQuery.length).indexOf(searchQuery) !== -1) {
                            setResult(prevResult => {
                                return [...prevResult, productsDb[id].productName]
                            });
                        }
                    }
                } else {
                    setResult([])
                }
            })
        } else {
            setResult([])
        }
    }, [value])


    //    useEffect(() => {
    //     if(product.length > 0)
    //     {
    //         fetch('products/').then(
    //             response => response.json()
    //         ).then( responseData => {
    //             setResult([]);
    //             let searchQuery = product.toLowerCase();
    //             for(const key in responseData){
    //                 let fruit = responseData[key].productName.toLowerCase();
    //                 if(fruit.slice(0, searchQuery.length).indexOf(searchQuery) !== -1){
    //                     setResult( prevResult => {
    //                         return[...prevResult, responseData[key].productName]
    //                     });
    //                 }
    //             }
    //         }).catch( error =>{
    //             console.log(error);
    //         })
    //     } else {
    //         setResult([]);
    //     }
    //    }, [product])

    useEffect(() => {
        firebaseDb.ref('orders/').on('value', (snapshot) => {
            if (snapshot.val() != null)
                setUnitObjects({
                    ...snapshot.val(),
                })
            else setUnitObjects({})
        })
    }, [])


    useEffect(() => {
        if (props.currentId == '')
            setValues({
                ...initialFieldValues,
            })
        else
            setValues({
                ...props.unitObjects[props.currentId],
            })
    }, [props.currentId, props.unitObjects])

    const handleInputChange = (e) => {
        var { name, value } = e.target
        setValues({
            ...values,
            [name]: value,
        })
    }

    const [imageUrl, setImageUrl] = useState()
    const readImages = async (e) => {
        const file = e.target.files[0]
        const id = uuid()
        const imagesRef = storage.ref('images').child(id)

        await imagesRef.put(file)
        imagesRef.getDownloadURL().then((url) => {
            setImageUrl(url)
        })
    }

    if (typeof imageUrl !== 'undefined' && imageUrl != null) {
        values.productImage = imageUrl
    }

    const handleFormSubmit = (e) => {
        console.log("inside handleFormSubmit")
        e.preventDefault()
        props.addOrEdit(values)
        window.location.reload(false)
    }

    const enabled = values.notes != null
    return (
        <Fragment>
            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">{props.currentId === '' ? 'Add' : 'Update'} Unit</h4>
                        </div>
                        <div className="card-body">
                            <div className="basic-form">
                                <form onSubmit={handleFormSubmit}>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label>Notes</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Notes"
                                                name='notes'
                                                value={values.notes}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label>Product</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Product"
                                                name='product'
                                                value={value}
                                                onChange={(event) => setValue(event.target.value)}
                                                required
                                            />
                                            <div className="searchBack"
                                            value={result}>
                                                {result.map((result, index) => (
                                                    // <a href="orders" id={index}>
                                                    <div className="searchEntry">   
                                                        {result}
                                                    </div>
                                                    // </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <input type="submit"
                                                value={props.currentId == '' ? 'Save' : 'Update'}
                                                className="btn btn-primary btn-block"
                                                disabled={!enabled} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default OrdersForm;