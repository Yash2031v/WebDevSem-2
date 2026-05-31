function Student({ name, course, marks }) {
    return (
        <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
            <h3>{name}</h3>
            <p><strong>Course:</strong> {course}</p>
            <p><strong>Marks:</strong> {marks}</p>
        </div>
    );
}

export default Student;