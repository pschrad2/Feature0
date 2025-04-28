import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import { Container, Typography, Card, CardContent } from '@mui/material';

const searchClient = algoliasearch('OCYAESOTGE', '93dd22079f5f8c174193f05cf3bc593c');

const Hit = ({ hit }) => (
    <Card sx={{ marginBottom: 2 }}>
        <CardContent>
            <Typography variant="h6">{hit.name}</Typography>
            <Typography variant="body2">{hit.title}</Typography>
            <Typography variant="body2" color="primary">
                <a href="profile/" target="_blank" rel="noopener noreferrer">
                    LinkedIn Profile
                </a>
            </Typography>
        </CardContent>
    </Card>
);

export default function MentorDiscovery() {
    return (
        <Container sx={{ marginTop: 4 }}>
            <Typography variant="h4" gutterBottom>Mentor Discovery</Typography>
            <InstantSearch searchClient={searchClient} indexName="Mentors">
                <SearchBox />
                <Hits hitComponent={Hit} />
            </InstantSearch>
        </Container>
    );
}