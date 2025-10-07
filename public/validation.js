document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('hero-form');
    if (!form) return;

form.addEventListener('submit', async function(e) {
    e.preventDefault();

constformData = new FormData(this);
    const submitData = {};


//collectformdata
for(const [key, value] of formData.entries()){
    if (value.trim()) {
    submitData[key] = value.trim();
}
}

    submitData.secretIdentity = document.getElementById('secretIdentity').checked;

    try {
        constresponse = awaitfetch(`/heroes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ superName, realName, superpower, powerLevel, secretIdentity })
        });
if()
}

})
})