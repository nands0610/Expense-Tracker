import { useState } from "react";
import { Card, Table, Form, Button } from "react-bootstrap";
import "./Trips.css";

interface Trip {
    id: number;
    destination: string;
    date: string;
    budget: number;
}

const initialTrips: Trip[] = [
    { id: 1, destination: "Bali", date: "2024-04-10", budget: 50000 },
    { id: 2, destination: "Manali", date: "2024-05-05", budget: 30000 },
    { id: 3, destination: "Paris", date: "2024-06-15", budget: 150000 },
    { id: 4, destination: "Dubai", date: "2024-07-20", budget: 80000 },
];

const Trips: React.FC = () => {
    const [trips, setTrips] = useState<Trip[]>(initialTrips);
    const [filterDestination, setFilterDestination] = useState("");
    const [filterStartDate, setFilterStartDate] = useState("");
    const [filterEndDate, setFilterEndDate] = useState("");

    const filteredTrips = trips.filter((trip) => {
        return (
            (filterDestination === "" ||
                trip.destination.toLowerCase().includes(filterDestination.toLowerCase())) &&
            (filterStartDate === "" || trip.date >= filterStartDate) &&
            (filterEndDate === "" || trip.date <= filterEndDate)
        );
    });

    return (
        <div className="trips-container">
            <h2 className="trips-title">✈️ Upcoming Trips</h2>

            {/* Grid Layout for Cards */}
            <div className="card-grid">
                {/* Filter Section */}
                <Card className="filter-card trips-card">
                    <Card.Body>
                        <h5 className="filter-title">Filter Trips</h5>
                        <Form className="filter-form">
                            <Form.Control
                                type="text"
                                className="filter-input"
                                placeholder="Search Destination"
                                value={filterDestination}
                                onChange={(e) => setFilterDestination(e.target.value)}
                            />
                            <Form.Control
                                type="date"
                                className="filter-input"
                                value={filterStartDate}
                                onChange={(e) => setFilterStartDate(e.target.value)}
                            />
                            <Form.Control
                                type="date"
                                className="filter-input"
                                value={filterEndDate}
                                onChange={(e) => setFilterEndDate(e.target.value)}
                            />
                            <Button variant="primary" className="apply-button">Apply</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>

            {/* Trip List */}
            <Card className="trips-list-card trips-card">
                <Card.Body>
                    <h5 className="list-title">🌍 Trip List</h5>
                    <Table striped bordered hover responsive className="trips-table">
                        <thead>
                            <tr>
                                <th>Destination</th>
                                <th>Date</th>
                                <th>Budget (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTrips.map((trip) => (
                                <tr key={trip.id}>
                                    <td className={`destination ${trip.destination.toLowerCase()}`}>
                                        {trip.destination}
                                    </td>
                                    <td>{trip.date}</td>
                                    <td>₹{trip.budget}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Trips;
