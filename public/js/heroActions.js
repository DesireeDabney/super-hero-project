function editHero(id) {
    document.getElementById(`display-${id}`).style.display = 'none';
    document.getElementById(`edit-${id}`).style.display = 'block';
}

function cancelEdit(id) {
    document.getElementById(`display-${id}`).style.display = 'block';
    document.getElementById(`edit-${id}`).style.display = 'none';
}

async function updateHero(id) {
    const superName = document.getElementById(`superName-${id}`).value;
    const realName = document.getElementById(`realName-${id}`).value;
    const superpower = document.getElementById(`superpower-${id}`).value;
}

if (!superName.trim() || !realName.trim() || !superpower.trim()) {
    alert('Please fill in all required fields');
    return;
}

try {
    const response = await fetch(`/heroes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ superName, realName, superpower })
    });

    if (response.ok) {
        window.location.reload();
    } else {
        alert('Failed to update hero');
    }
} catch (error) {
    console.error('Error:', error);
    alert('Failed to update hero');
}

async function deleteHero(id) {
    if (!confirm('Are you sure you want to delete this hero?')) {
        return;
    }

    try {
        const response = await fetch(`/heroes/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            document.getElementById(`hero-${id}`).remove();

            const remaining = document.querySelector('[id^="hero-"]');
            if (remaining.length === 0) {
                window.location.reload();
            }
        } else {
            alert('Failed to delete hero')
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to delete hero');
    }
}