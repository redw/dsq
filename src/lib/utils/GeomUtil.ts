/**
 * 几何学工具
 * @author j
 *
 */
module GeomUtil {
	/**
	 * 弧度转角度乘值
	 */
	const R_T_D = 180 / Math.PI;

	/**
	 * 角度转弧度乘值
	 */
	const D_T_R = Math.PI / 180;

	/**
	 * 弧度转角度
	 * @param radians
	 * @return
	 *
	 */
	export function radiansToDegrees(radians:number) {
		return radians * R_T_D;
	}

	/**
	 * 角度转弧度
	 * @param degrees
	 * @return
	 *
	 */
	export function degreesToRadians(degrees:number) {
		return degrees * D_T_R;
	}

	/**
	 * 两点间的角度
	 * @param p_1
	 * @param p_2
	 * @return
	 *
	 */
	export function pointAngle(p_1:egret.Point, p_2:egret.Point) {
		return Math.atan2(p_2.y - p_1.y, p_2.x - p_1.x) * R_T_D;
	}

	/**
	 * 两点间的弧度
	 * @param p1
	 * @param p2
	 * @return
	 *
	 */
	export function pointRadians(p_1:egret.Point, p_2:egret.Point) {
		return Math.atan2(p_2.y - p_1.y, p_2.x - p_1.x);
	}

	/**
	 * 角度转为角速度
	 * @param angle
	 * @return
	 *
	 */
	export function angleToSpeed(angle:number) {
		let radians:number = angle * D_T_R;
		return new egret.Point(Math.cos(radians), Math.sin(radians));
	}

	/**
	 * 弧度转为角速度
	 * @param angle
	 * @return
	 *
	 */
	export function radiansToSpeed(radians:number) {
		return new egret.Point(Math.cos(radians), Math.sin(radians));
	}

	/**
	 * 两点间的角速度
	 * @param p_1
	 * @param p_2
	 * @return
	 *
	 */
	export function angleSpeed(p_1:egret.Point, p_2:egret.Point) {
		let radians:number = Math.atan2(p_2.y - p_1.y, p_2.x - p_1.x);
		return new egret.Point(Math.cos(radians), Math.sin(radians));
	}

	/**
	 * 获取以原始点为中心的圆圈上的一个点（正向运动基础算法）
	 * @param p 原始点
	 * @param angle 角度
	 * @param length 与当前点之间的长度
	 * @return
	 *
	 */
	export function getCirclePoint(point:egret.Point, angle:number, length:number) {
		let radians:number = angle * D_T_R;
		return point.add(new egret.Point(Math.cos(radians) * length, Math.sin(radians) * length));
	}

	/**
	 * 获取以原始点为中心的圆圈上的一个点（正向运动基础算法）
	 * @param p 原始点
	 * @param radians 弧度
	 * @param length 与当前点之间的长度
	 * @return
	 *
	 */
	export function getCirclePoint2(point:egret.Point, radians:number, length:number) {
		return point.add(new egret.Point(Math.cos(radians) * length, Math.sin(radians) * length));
	}

	/**
	 * 获取贝塞尔曲线Y坐标
	 * @param x X坐标（0-1）
	 * @param startY 初始Y坐标（0-1）
	 * @return
	 *
	 */
	export function getBezierY(x:number, startY:number = 0) {
		if (x < 0 || x > 1) {
			return 0;
		} else if(startY < 0 || startY > 1)
		{
			return 0;
		} else {
			var startX:number = 0.5 - Math.sqrt((1 - startY) / 4);
			var currentX:number = x * (1 - startX) + startX;
			return 4 * (currentX - 0.5) * (currentX - 0.5) - 1;
		}
	}

	/**
	 * 获取线段ab，cd是否相交
	 * @param a
	 * @param b
	 * @param c
	 * @param d
	 * @return
	 *
	 */
	export function getLineAcross(a:egret.Point, b:egret.Point, c:egret.Point, d:egret.Point):boolean {
		if (a == null || b == null || c == null || d == null) {
			return false;
		}

		let area_abc:number = (a.x - c.x) * (b.y - c.y) - (a.y - c.y) * (b.x - c.x);
		let area_abd:number = (a.x - d.x) * (b.y - d.y) - (a.y - d.y) * (b.x - d.x);

		if (area_abc * area_abd > 0) {
			return false;
		}

		let area_cda:number = (c.x - a.x) * (d.y - a.y) - (c.y - a.y) * (d.x - a.x);
		let area_cdb:number = (c.x - b.x) * (d.y - b.y) - (c.y - b.y) * (d.x - b.x);

		if (area_cda * area_cdb > 0) {
			return false;
		}
		return true;
	}

	/**
	 * 获取线段ab，cd的相交点
	 * @param a
	 * @param b
	 * @param c
	 * @param d
	 * @return
	 *
	 */
	export function getLineAcrossPoint(a:egret.Point, b:egret.Point, c:egret.Point, d:egret.Point) {
		if (a == null || b == null || c == null || d == null) {
			return null;
		}

		let area_abc = (a.x - c.x) * (b.y - c.y) - (a.y - c.y) * (b.x - c.x);
		let area_abd = (a.x - d.x) * (b.y - d.y) - (a.y - d.y) * (b.x - d.x);
		if (area_abc * area_abd > 0) {
			return null;
		}

		let area_cda = (c.x - a.x) * (d.y - a.y) - (c.y - a.y) * (d.x - a.x);
		let area_cdb = (c.x - b.x) * (d.y - b.y) - (c.y - b.y) * (d.x - b.x);
		if (area_cda * area_cdb > 0) {
			return null;
		}

		let t = area_cda / (area_abd- area_abc);
		let dx = t * (b.x - a.x);
		let dy = t * (b.y - a.y);
		return new egret.Point(a.x + dx, a.y + dy);
	}

	/**
	 * 点是否在quad内,注意一家要是凸四边形
	 * @param point
	 * @param A
	 * @param B
	 * @param C
	 * @param D
	 * @returns {boolean}
	 */
	export function isPointInQuad(point:egret.Point, A:egret.Point, B:egret.Point, C:egret.Point, D:egret.Point) {
		if (!point || !A || !B || !C || !D) {
			return null;
		}
		let x = point.x;
		let y = point.y;
		let a = (B.x - A.x) * (y - A.y) - (B.y - A.y) * (x - A.x);
		let b = (C.x - B.x) * (y - B.y) - (C.y - B.y) * (x - B.x);
		let c = (D.x - C.x) * (y - C.y) - (D.y - C.y) * (x - C.x);
		let d = (A.x - D.x) * (y - D.y) - (A.y - D.y) * (x - D.x);
		if ((a > 0 && b > 0 && c > 0 && d > 0) || (a < 0 && b < 0 && c < 0 && d < 0)) {
			return true;
		}
		return false;
	}
}