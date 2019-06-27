import * as fs from 'fs';

const readFileSyncSpy = jest.spyOn(fs, 'readFileSync');

readFileSyncSpy.mockImplementation(() => undefined);

jest.setTimeout(30000);

test('leak', async () => {
    await new Promise((resolve) => setTimeout(resolve, 29000));
    expect({
        random: 'object'
    }).toMatchSnapshot();
});