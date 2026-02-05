class App {
    constructor(endpoint) { 
        this.endpoint = endpoint; 
    }
    
    async post() {
        try {
            const r = await fetch(this.endpoint, { method: 'POST' });
            if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`);
            return await r.json();
        } catch (e) {
            return { error: "Failed to insert: " + e.message };
        }
    }

    async get(sql) {
        try {
            const r = await fetch(`${this.endpoint}/${encodeURIComponent(sql)}`);
            if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`);
            return await r.json();
        } catch (e) {
            return { error: "Query failed: " + e.message };
        }
    }
}

const app = new App("http://localhost:3000/lab5/api/v1/sql");

document.getElementById('insBtn').onclick = async () => {
    const data = await app.post();
    document.getElementById('insRes').innerText = JSON.stringify(data);
};

document.getElementById('queryBtn').onclick = async () => {
    const sql = document.getElementById('sqlBox').value;
    if (!sql.trim()) {
        alert("Please enter a query");
        return;
    }
    const data = await app.get(sql);
    document.getElementById('queryRes').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
};