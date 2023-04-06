import Header from "../components/header";
import {useState} from 'react';

function Cart() {

    const [userEmail, setUserEmail] = useState("test@test.com");
    const [pickupTime, setPickupTime] = useState("20-30 minutes");
    const [totalWithoutTax, setTotal] = useState(3200);
    const tax = Math.ceil(totalWithoutTax * 0.08);
    const totalWithTax = totalWithoutTax + tax;

    return (
        <div>
            <div>
                Cart
                <div>
                    Account Details
                    <div>{{ userEmail }}</div>
                </div>
                <div>
                    Order ready for pickup in:<span>{{ pickupTime }}</span>
                </div>
                <div>
                    <span>
                        <div>Standard</div>
                        <div>{{ pickupTime }}</div>
                    </span>
                    <span>
                        <div>Schedule for later</div>
                        <div>Choose a time</div>
                    </span>
                </div>
            </div>
            <div>
                <div>
                    Total Order Amount: {{ totalWithoutTax }}
                </div>
                <div>
                    Taxes: {{tax}}
                </div>
                <div>
                    Total With Tax: {{totalWithTax}}
                </div>
            </div>
        </div>
    )
}

export default Cart;