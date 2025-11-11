// login-serverless.js (Node.js)

exports.handler = async (event, context) => {
    // 1. Check method
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: JSON.stringify({ message: "Method Not Allowed" }) };
    }

    try {
        // Parse the JSON data sent from the browser
        const data = JSON.parse(event.body);
        const { username, password } = data;

        // 2. Secure Credential Check (Password is 'admin123')
        if (username === 'admin' && password === 'admin123') {
            // SUCCESS!
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, redirect: 'dashboard.html' }),
            };
        }

        // FAILURE
        return { 
            statusCode: 401, 
            body: JSON.stringify({ success: false, message: "Invalid credentials." }) 
        };

    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ message: "Server error during login." }) };
    }
};
