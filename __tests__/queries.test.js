import { getAllCommunes, getParcoursFromCommune, searchAndGetCommunes, getParcoursContents } from '../app/utils/queries';

test('Test get city from name', async () => {
    const res = await searchAndGetCommunes("Genilac");
    expect(res[0].departement).toBe(42);
    expect(res[0].nom).toBe("Genilac");
});

test('Get all communes', async () => {
    const res = await getAllCommunes();
    console.log(res);
});

test("Get all parcours from commune", async () => {
    const res = await getParcoursFromCommune("Saint-Etienne");
    console.log(res);
})

test("Get parcours content from id", async () => {
    const id = "V4gp7A6yWUAxcaPWnqc6" // Saint-Étienne
    const res = await getParcoursContents(id);
    console.log(res);
})