import axios from "axios";

export const getCurrencyConversion = async () => {
    try {
        const response = await axios.get('https://api.apilayer.com/fixer/latest', {
            headers: {
                'apikey': 'fwvxMzqGJJ2GQ55ZQc1wCJoz91yp9RL7'
            }
        });

        // Trả về dữ liệu từ phản hồi API
        return response.data;
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error fetching currency conversion:', error);
        return null;
    }
};

export const getCurrencySymbols = async () => {
    try {
        const response = await axios.get('https://api.apilayer.com/fixer/symbols', {
            headers: {
                'apikey': 'fwvxMzqGJJ2GQ55ZQc1wCJoz91yp9RL7'
            }
        });

        // Trả về dữ liệu từ phản hồi API
        return response.data;
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error fetching currency conversion:', error);
        return null;
    }
};


