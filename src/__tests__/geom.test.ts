import {
  getA4PaperSize,
  getCenterPointFromSize,
  getPaperPosFromDesktopPos,
  getDesktopPosFromPaperPos,
  getDesktopSizeFromPaperSize,
  getScalingFromPaperToDesktop,
  getZoom,
  getNaturalScalingFromPaperToDesktop,
  Pos2,
  Size2,
} from '../geom';

describe('paper size', () => {
  test('A4', () => {
    const [pdx, pdy] = getA4PaperSize();
    expect([pdx, pdy]).toEqual([210, 297]);
  });
});

describe('desktop to paper scaling, given desktop and paper size', () => {
  const ps: Size2 = [200, 200];
  const ds_wide: Size2 = [1000, 500];
  const ds_tall: Size2 = [500, 1000];
  const ds_square: Size2 = [1000, 1000];
  test('wide desktop, square paper', () => {
    expect(getNaturalScalingFromPaperToDesktop(ds_wide, ps)).toEqual(2.5);
    expect(getScalingFromPaperToDesktop(ds_wide, ps, 3)).toEqual(7.5);
  });
  test('tall desktop, square paper', () => {
    expect(getNaturalScalingFromPaperToDesktop(ds_tall, ps)).toEqual(2.5);
    expect(getScalingFromPaperToDesktop(ds_tall, ps, 0.5)).toEqual(1.25);
  });
  test('square desktop, square paper', () => {
    expect(getNaturalScalingFromPaperToDesktop(ds_square, ps)).toEqual(5);
    expect(getScalingFromPaperToDesktop(ds_square, ps, 7)).toEqual(35);
  });
});

describe('paper size on desktop, given scaling', () => {
  const ds: Size2 = [1000, 500];
  const ps: Size2 = [200, 200];
  const pf: Pos2 = [100, 100];
  const df: Pos2 = [500, 250];
  const dd_dp_0 = 2.5;
  test('centered', () => {
    expect(getDesktopSizeFromPaperSize(ps, dd_dp_0)).toEqual([500, 500]);
    expect(getDesktopSizeFromPaperSize(ps, dd_dp_0 * 5)).toEqual([
      5 * 500,
      5 * 500,
    ]);
  });
});

describe('paper pos to desktop pos, given fixed points and scaling', () => {
  const pf: Pos2 = [100, 100];
  const df: Pos2 = [500, 500];
  test('paper fixed -> desktop fixed', () => {
    expect(getDesktopPosFromPaperPos(pf, df, pf, 1)).toEqual(df);
    expect(getDesktopPosFromPaperPos(pf, df, pf, 100)).toEqual(df);
  });
  test('off paper fixed -> depends on zoom', () => {
    const [pf_x, pf_y] = pf;
    const [df_x, df_y] = df;
    const [dx_p, dy_p] = [10, 20];
    expect(
      getDesktopPosFromPaperPos([pf_x + dx_p, pf_y + dy_p], df, pf, 1),
    ).toEqual([df_x + dx_p * 1, df_y + dy_p * 1]);
    expect(
      getDesktopPosFromPaperPos([pf_x + dx_p, pf_y + dy_p], df, pf, 5),
    ).toEqual([df_x + dx_p * 5, df_y + dy_p * 5]);
  });
});

describe('desktop pos to paper pos', () => {
  const pf: Pos2 = [100, 100];
  const df: Pos2 = [500, 500];
  test('desktop fixed -> paper fixed', () => {
    expect(getPaperPosFromDesktopPos(df, df, pf, 1)).toEqual(pf);
    expect(getPaperPosFromDesktopPos(df, df, pf, 100)).toEqual(pf);
  });
  test('off desktop fixed -> depends on zoom', () => {
    const [pf_x, pf_y] = pf;
    const [df_x, df_y] = df;
    const [dx_d, dy_d] = [10, 20];
    expect(
      getPaperPosFromDesktopPos([df_x + dx_d, df_y + dy_d], df, pf, 1),
    ).toEqual([pf_x + dx_d / 1, pf_y + dy_d / 1]);
    expect(
      getPaperPosFromDesktopPos([df_x + dx_d, df_y + dy_d], df, pf, 5),
    ).toEqual([pf_x + dx_d / 5, pf_y + dy_d / 5]);
  });
});

describe('center-point in size', () => {
  test('[500, 500] -> [250, 250]', () => {
    expect(getCenterPointFromSize([500, 500])).toEqual([250, 250]);
  });
});

describe('zoom', () => {
  test('neutral', () => {
    expect(getZoom(0)).toEqual(1);
  });
  test('magnifying', () => {
    expect(getZoom(4)).toEqual(2);
  });
  test('reducing', () => {
    expect(getZoom(-4)).toEqual(0.5);
  });
});
