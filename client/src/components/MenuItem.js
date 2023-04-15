import React from 'react';

export const MenuItem = (props) => {
    return (
        <div className={props.className} key={`${props.item.menuItem.id}${props.index}`} >
            <div className="card m-3">
                <div className="bg-image hover-zoom ripple">
                    <div className="card-body">
                        <h5 className="card-title mb-3">{props.item.menuItem.name}</h5>

                        <img
                            src={`data:image/png;base64,${props.item.menuItem.image}`}
                            className="w-50 mb-3"
                            alt="a"
                        />

                        <h6 className="mb-3">
                            <strong className="text-danger">{props.item.menuItem.price}</strong>
                        </h6>

                        {!props.isLogged ?
                            (<button data-item-id={props.item._id}
                                className="m-3 btn btn-success"
                                onClick={props.deleteFromCart}
                            >
                                Delete
                            </button>
                            ) : (
                                <div></div>
                            )}
                    </div>
                </div>
            </div>
        </div>
    )
}
