import React, { useState } from 'react';
import axios from 'axios';

const LoanPage = () => {
    const [formData, setFormData] = useState({
        loan_amnt: 10000,
        term: 60,
        int_rate: 14.65,
        installment: 337.86,
        sub_grade: 'C1',
        emp_length: 10,
        home_ownership: 'RENT',
        annual_inc: 24000,
        verification_status: 'Verified',
        fico_score: 682,
        delinq_2yrs: 0,
        purpose: 'credit_card',
        dti: 27.65,
        open_acc: 3,
        pub_rec: 0,
        pub_rec_bankruptcies: 0,
        revol_bal: 13648,
        revol_util: 83.7,
        total_acc: 9
    });

    const [predictionResult, setPredictionResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');  // Lấy token từ localStorage
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

            // Gửi yêu cầu dự đoán đến server Flask
            const response = await axios.post('http://127.0.0.1:5000/predict', formData, config);
            console.log('Prediction result:', response.data);  // Log thông tin dự đoán

            // Chuyển đổi giá trị dự đoán sang chuỗi "Charged-Off" hoặc "Fully-Paid"
            const predictionText = response.data.prediction === 1 ? 'Charged-Off' : 'Fully-Paid';

            // Cập nhật kết quả dự đoán trên giao diện
            setPredictionResult(predictionText);
        } catch (error) {
            console.error('Prediction submission failed:', error);
            // Xử lý lỗi nếu cần thiết
            alert('Prediction submission failed!');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    return (
        <div className='loan-page'>
            <h2>Prediction Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Loan Amount:</label>
                    <input type="number" name="loan_amnt" value={formData.loan_amnt} onChange={handleChange} required />
                </div>
                <div>
                    <label>Term:</label>
                    <input type="number" name="term" value={formData.term} onChange={handleChange} required />
                </div>
                <div>
                    <label>Interest Rate:</label>
                    <input type="number" step="0.01" name="int_rate" value={formData.int_rate} onChange={handleChange} required />
                </div>
                <div>
                    <label>Installment:</label>
                    <input type="number" name="installment" value={formData.installment} onChange={handleChange} required />
                </div>
                <div>
                    <label>Sub Grade:</label>
                    <input type="text" name="sub_grade" value={formData.sub_grade} onChange={handleChange} required />
                </div>
                <div>
                    <label>Employment Length:</label>
                    <input type="number" name="emp_length" value={formData.emp_length} onChange={handleChange} required />
                </div>
                <div>
                    <label>Home Ownership:</label>
                    <select name="home_ownership" value={formData.home_ownership} onChange={handleChange} required>
                        <option value="RENT">Rent</option>
                        <option value="OWN">Own</option>
                        <option value="MORTGAGE">Mortgage</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>
                <div>
                    <label>Annual Income:</label>
                    <input type="number" name="annual_inc" value={formData.annual_inc} onChange={handleChange} required />
                </div>
                <div>
                    <label>Verification Status:</label>
                    <select name="verification_status" value={formData.verification_status} onChange={handleChange} required>
                        <option value="Verified">Verified</option>
                        <option value="Not Verified">Not Verified</option>
                    </select>
                </div>
                <div>
                    <label>FICO Score:</label>
                    <input type="number" name="fico_score" value={formData.fico_score} onChange={handleChange} required />
                </div>
                <div>
                    <label>Delinquencies in 2 Years:</label>
                    <input type="number" name="delinq_2yrs" value={formData.delinq_2yrs} onChange={handleChange} required />
                </div>
                <div>
                    <label>Purpose:</label>
                    <input type="text" name="purpose" value={formData.purpose} onChange={handleChange} required />
                </div>
                <div>
                    <label>Debt-to-Income Ratio (DTI):</label>
                    <input type="number" step="0.01" name="dti" value={formData.dti} onChange={handleChange} required />
                </div>
                <div>
                    <label>Open Accounts:</label>
                    <input type="number" name="open_acc" value={formData.open_acc} onChange={handleChange} required />
                </div>
                <div>
                    <label>Public Records:</label>
                    <input type="number" name="pub_rec" value={formData.pub_rec} onChange={handleChange} required />
                </div>
                <div>
                    <label>Public Record Bankruptcies:</label>
                    <input type="number" name="pub_rec_bankruptcies" value={formData.pub_rec_bankruptcies} onChange={handleChange} required />
                </div>
                <div>
                    <label>Revolving Balance:</label>
                    <input type="number" name="revol_bal" value={formData.revol_bal} onChange={handleChange} required />
                </div>
                <div>
                    <label>Revolving Utilization:</label>
                    <input type="number" step="0.01" name="revol_util" value={formData.revol_util} onChange={handleChange} required />
                </div>
                <div>
                    <label>Total Accounts:</label>
                    <input type="number" name="total_acc" value={formData.total_acc} onChange={handleChange} required />
                </div>
                <button className='btn sm danger' type="submit">Submit Prediction</button>
            </form>
            {predictionResult && (
                <div>
                    <h3>Prediction Result</h3>
                    <p>Prediction: {predictionResult}</p>
                </div>
            )}
        </div>
    );
};

export default LoanPage;