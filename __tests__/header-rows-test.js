import * as resolve from '../src';

const resolveHeaderRows = resolve.headerRows;

describe('resolveHeaderRows', function () {
  it('returns columns wrapped in an array', function () {
    const column = {
      header: {
        label: 'bar'
      }
    };
    const columns = [column];
    const expected = [
      [
        {
          props: {
            rowSpan: 1
          },
          ...column
        }
      ]
    ];

    expect(resolveHeaderRows({ columns })).toEqual(expected);
  });

  it('passes props to column result', function () {
    const props = {
      bar: 'bar'
    };
    const column = {
      header: {
        label: 'bar'
      },
      props
    };
    const columns = [column];
    const expected = [
      [
        {
          ...column,
          props: {
            ...props,
            rowSpan: 1
          }
        }
      ]
    ];

    expect(resolveHeaderRows({ columns })).toEqual(expected);
  });

  it('returns columns with child wrapped in an array', function () {
    const childColumn = {
      header: {
        label: 'foo'
      }
    };
    const column = {
      header: {
        label: 'bar'
      },
      children: [
        childColumn
      ]
    };
    const columns = [column];
    const expected = [
      [
        {
          header: column.header,
          props: {
            colSpan: 1
          }
        }
      ],
      [
        {
          ...childColumn,
          props: {
            rowSpan: 1
          }
        }
      ]
    ];

    expect(resolveHeaderRows({ columns })).toEqual(expected);
  });

  it('calculates colSpan based on children', function () {
    const childColumn = {
      header: {
        label: 'foo'
      }
    };
    const column = {
      header: {
        label: 'bar'
      },
      children: [
        childColumn,
        childColumn
      ]
    };
    const columns = [column];
    const expected = [
      [
        {
          header: column.header,
          props: {
            colSpan: 2
          }
        }
      ],
      [
        {
          ...childColumn,
          props: {
            rowSpan: 1
          }
        },
        {
          ...childColumn,
          props: {
            rowSpan: 1
          }
        }
      ]
    ];

    expect(resolveHeaderRows({ columns })).toEqual(expected);
  });

  it('calculates colSpan and rowSpan based on siblings ang children', function () {
    const basicColumn = {
      header: {
        label: 'foo'
      }
    };
    const thirdColumn = {
      header: {
        label: 'boo'
      }
    };
    const column = {
      header: {
        label: 'bar'
      },
      children: [
        basicColumn,
        {
          ...thirdColumn,
          children: [
            basicColumn,
            thirdColumn
          ]
        }
      ]
    };
    const columns = [basicColumn, column];
    const expected = [
      [
        {
          ...basicColumn,
          props: {
            rowSpan: 3
          }
        },
        {
          header: {
            label: 'bar'
          },
          props: {
            colSpan: 3
          }
        }
      ],
      [
        {
          ...basicColumn,
          props: {
            rowSpan: 2
          }
        },
        {
          ...thirdColumn,
          props: {
            colSpan: 2
          }
        }
      ],
      [
        {
          ...basicColumn,
          props: {
            rowSpan: 1
          }
        },
        {
          ...thirdColumn,
          props: {
            rowSpan: 1
          }
        }
      ]
    ];

    expect(resolveHeaderRows({ columns })).toEqual(expected);
  });
});
