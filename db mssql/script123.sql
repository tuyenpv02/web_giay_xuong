USE [master]
GO
/****** Object:  Database [XuongWebGiay]    Script Date: 3/27/2024 1:57:21 PM ******/
CREATE DATABASE [XuongWebGiay]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'XuongWebGiay', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\XuongWebGiay.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'XuongWebGiay_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\XuongWebGiay_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [XuongWebGiay] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [XuongWebGiay].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [XuongWebGiay] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [XuongWebGiay] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [XuongWebGiay] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [XuongWebGiay] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [XuongWebGiay] SET ARITHABORT OFF 
GO
ALTER DATABASE [XuongWebGiay] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [XuongWebGiay] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [XuongWebGiay] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [XuongWebGiay] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [XuongWebGiay] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [XuongWebGiay] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [XuongWebGiay] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [XuongWebGiay] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [XuongWebGiay] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [XuongWebGiay] SET  DISABLE_BROKER 
GO
ALTER DATABASE [XuongWebGiay] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [XuongWebGiay] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [XuongWebGiay] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [XuongWebGiay] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [XuongWebGiay] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [XuongWebGiay] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [XuongWebGiay] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [XuongWebGiay] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [XuongWebGiay] SET  MULTI_USER 
GO
ALTER DATABASE [XuongWebGiay] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [XuongWebGiay] SET DB_CHAINING OFF 
GO
ALTER DATABASE [XuongWebGiay] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [XuongWebGiay] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [XuongWebGiay] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [XuongWebGiay] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [XuongWebGiay] SET QUERY_STORE = OFF
GO
USE [XuongWebGiay]
GO
/****** Object:  Table [dbo].[anh]    Script Date: 3/27/2024 1:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[anh](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[idChiTietSP] [bigint] NULL,
	[ten] [nvarchar](100) NOT NULL,
	[url] [nvarchar](max) NULL,
	[ngayTao] [datetime2](7) NULL,
	[ngayCapNhat] [datetime] NULL,
	[nguoiTao] [nvarchar](50) NULL,
	[nguoiCapNhat] [nvarchar](50) NULL,
	[trangThai] [int] NULL,
 CONSTRAINT [PK__anh__3213E83FC61D2FE9] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[chat_lieu]    Script Date: 3/27/2024 1:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chat_lieu](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[ten] [nvarchar](100) NOT NULL,
	[ngayTao] [datetime] NULL,
	[ngayCapNhat] [datetime] NULL,
	[nguoiTao] [nvarchar](50) NULL,
	[nguoiCapNhat] [nvarchar](50) NULL,
	[trangThai] [int] NULL,
 CONSTRAINT [PK__chat_lie__3213E83F11529571] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[chi_tiet_san_pham]    Script Date: 3/27/2024 1:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chi_tiet_san_pham](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[idSanPham] [bigint] NULL,
	[idMauSac] [bigint] NULL,
	[idKichCo] [bigint] NULL,
	[idDeGiay] [bigint] NULL,
	[idChatLieu] [bigint] NULL,
	[ma] [nvarchar](200) NULL,
	[ten] [nvarchar](100) NOT NULL,
	[soLuong] [int] NULL,
	[giaBan] [decimal](18, 0) NULL,
	[moTa] [nvarchar](max) NULL,
	[ngayTao] [datetime] NULL,
	[ngayCapNhat] [datetime] NULL,
	[nguoiTao] [nvarchar](50) NULL,
	[nguoiCapNhat] [nvarchar](50) NULL,
	[trangThai] [int] NULL,
 CONSTRAINT [PK__chi_tiet__3213E83F248A4786] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[de_giay]    Script Date: 3/27/2024 1:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[de_giay](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[ten] [nvarchar](100) NOT NULL,
	[ngayTao] [datetime] NULL,
	[ngayCapNhat] [datetime] NULL,
	[nguoiTao] [nvarchar](50) NULL,
	[nguoiCapNhat] [nvarchar](50) NULL,
	[trangThai] [int] NULL,
 CONSTRAINT [PK__de_giay__3213E83FA737D4C1] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[dia_chi]    Script Date: 3/27/2024 1:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[dia_chi](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[idTaiKhoan] [bigint] NULL,
	[ten] [nvarchar](100) NOT NULL,
	[sdt] [nvarchar](20) NULL,
	[thanhPho] [nvarchar](50) NULL,
	[huyen] [nvarchar](50) NULL,
	[xa] [nvarchar](50) NULL,
	[moTa] [nvarchar](max) NULL,
	[ngayTao] [datetime] NULL,
	[ngayCapNhat] [datetime] NULL,
	[nguoiTao] [nvarchar](50) NULL,
	[nguoiCapNhat] [nvarchar](50) NULL,
	[trangThai] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[giam_gia]    Script Date: 3/27/2024 1:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[giam_gia](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[ma] [nvarchar](100) NULL,
	[ten] [nvarchar](100) NULL,
	[soLuong] [int] NULL,
	[dieuKien] [decimal](18, 0) NULL,
	[giaTriGiam] [decimal](12, 0) NULL,
	[ngayBatDau] [datetime] NULL,
	[ngayKetThuc] [datetime] NULL,
	[trangThai] [int] NULL,
	[ngayTao] [datetime] NULL,
	[ngayCapNhat] [datetime] NULL,
	[nguoiTao] [nvarchar](50) NULL,
	[nguoiCapNhat] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[gio_hang]    Script Date: 3/27/2024 1:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[gio_hang](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[idTaiKhoan] [bigint] NULL,
	[idChiTietSanPham] [bigint] NULL,
	[soLuong] [int] NULL,
	[donGia] [decimal](18, 0) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[hoa_don]    Script Date: 3/27/2024 1:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[hoa_don](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[idTaiKhoan] [bigint] NULL,
	[idGiamGia] [bigint] NULL,
	[ma] [nvarchar](100) NULL,
	[hoTen] [nvarchar](100) NULL,
	[email] [nvarchar](50) NULL,
	[sdt] [varchar](20) NULL,
	[diaChi] [varchar](100) NULL,
	[tongTien] [decimal](18, 0) NULL,
	[tienShip] [decimal](18, 0) NULL,
	[tienGiam] [decimal](18, 0) NULL,
	[ngayGiao] [datetime] NULL,
	[ngayThanhToan] [datetime] NULL,
	[ngayNhan] [datetime] NULL,
	[ghiChu] [nvarchar](255) NULL,
	[loaiHoaDon] [int] NULL,
	[trangThai] [int] NULL,
	[ngayTao] [datetime] NULL,
	[ngayCapNhat] [datetime] NULL,
	[nguoiTao] [nvarchar](50) NULL,
	[nguoiCapNhat] [nvarchar](50) NULL,
 CONSTRAINT [PK__hoa_don__3213E83FA56BD453] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[hoa_don_chi_tiet]    Script Date: 3/27/2024 1:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[hoa_don_chi_tiet](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[idChiTietSanPham] [bigint] NULL,
	[idHoaDon] [bigint] NULL,
	[soLuong] [int] NULL,
	[donGia] [decimal](18, 0) NULL,
	[trangThai] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[kich_co]    Script Date: 3/27/2024 1:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[kich_co](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[ten] [nvarchar](100) NOT NULL,
	[ngayTao] [datetime] NULL,
	[ngayCapNhat] [datetime] NULL,
	[nguoiTao] [nvarchar](50) NULL,
	[nguoiCapNhat] [nvarchar](50) NULL,
	[trangThai] [int] NULL,
 CONSTRAINT [PK__kich_co__3213E83FF7B7B157] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[lich_su_hoa_don]    Script Date: 3/27/2024 1:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[lich_su_hoa_don](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[idHoaDon] [bigint] NULL,
	[ghiChu] [nvarchar](255) NULL,
	[hanhDong] [int] NULL,
	[trangThai] [int] NULL,
	[ngayTao] [datetime] NULL,
	[ngayCapNhat] [datetime] NULL,
	[nguoiTao] [nvarchar](50) NULL,
	[nguoiCapNhat] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[mau_sac]    Script Date: 3/27/2024 1:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mau_sac](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[ten] [nvarchar](100) NOT NULL,
	[maMau] [varchar](30) NULL,
	[ngayTao] [datetime] NULL,
	[ngayCapNhat] [datetime] NULL,
	[nguoiTao] [nvarchar](50) NULL,
	[nguoiCapNhat] [nvarchar](50) NULL,
	[trangThai] [int] NULL,
 CONSTRAINT [PK__mau_sac__3213E83FF2F546BE] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[phuong_thuc_thanh_toan]    Script Date: 3/27/2024 1:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[phuong_thuc_thanh_toan](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[idHoaDon] [bigint] NULL,
	[tenPhuongThucTT] [nvarchar](100) NULL,
	[loaiThanhToan] [int] NULL,
	[tongTien] [decimal](18, 0) NULL,
	[ghiChu] [nvarchar](255) NULL,
	[trangThai] [int] NULL,
	[ngayTao] [datetime] NULL,
	[ngayCapNhat] [datetime] NULL,
	[nguoiTao] [nvarchar](50) NULL,
	[nguoiCapNhat] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[san_pham]    Script Date: 3/27/2024 1:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[san_pham](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[idThuongHieu] [bigint] NULL,
	[ten] [nvarchar](100) NOT NULL,
	[moTa] [nvarchar](max) NULL,
	[ngayTao] [datetime] NULL,
	[ngayCapNhat] [datetime] NULL,
	[nguoiTao] [nvarchar](50) NULL,
	[nguoiCapNhat] [nvarchar](50) NULL,
	[trangThai] [int] NULL,
 CONSTRAINT [PK__san_pham__3213E83F73E5CA22] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tai_khoan]    Script Date: 3/27/2024 1:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tai_khoan](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[ten] [nvarchar](100) NOT NULL,
	[sdt] [nvarchar](20) NULL,
	[ngaySinh] [date] NULL,
	[email] [nvarchar](50) NULL,
	[gioiTinh] [int] NULL,
	[cccd] [varchar](15) NULL,
	[anh] [nvarchar](max) NULL,
	[vaiTro] [int] NULL,
	[matKhau] [nvarchar](100) NULL,
	[ngayTao] [datetime] NULL,
	[ngayCapNhat] [datetime] NULL,
	[nguoiTao] [nvarchar](50) NULL,
	[nguoiCapNhat] [nvarchar](50) NULL,
	[trangThai] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[thuong_hieu]    Script Date: 3/27/2024 1:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[thuong_hieu](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[ten] [nvarchar](100) NOT NULL,
	[ngayTao] [datetime] NULL,
	[ngayCapNhat] [datetime] NULL,
	[nguoiTao] [nvarchar](50) NULL,
	[nguoiCapNhat] [nvarchar](50) NULL,
	[trangThai] [int] NULL,
 CONSTRAINT [PK__thuong_h__3213E83F15657DFA] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[anh] ON 

INSERT [dbo].[anh] ([id], [idChiTietSP], [ten], [url], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (6, NULL, N'1', N'1', CAST(N'2023-04-05T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-03T00:00:00.000' AS DateTime), N'1', N'1', 1)
SET IDENTITY_INSERT [dbo].[anh] OFF
GO
SET IDENTITY_INSERT [dbo].[chat_lieu] ON 

INSERT [dbo].[chat_lieu] ([id], [ten], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (1, N'cao su đặc', CAST(N'2024-08-05T05:43:00.000' AS DateTime), CAST(N'2024-08-05T05:43:00.000' AS DateTime), N'Tuyên', N'Tuyên', 1)
INSERT [dbo].[chat_lieu] ([id], [ten], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (2, N'da', CAST(N'2024-08-05T05:43:00.000' AS DateTime), CAST(N'2024-08-05T05:43:00.000' AS DateTime), N'Tuyên', N'tuyên', 1)
INSERT [dbo].[chat_lieu] ([id], [ten], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (3, N'vải', CAST(N'2024-08-05T05:43:00.000' AS DateTime), CAST(N'2024-03-19T16:46:20.000' AS DateTime), N'tuyên', N'system', 0)
INSERT [dbo].[chat_lieu] ([id], [ten], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (4, N'1111', CAST(N'2024-03-19T16:34:20.000' AS DateTime), NULL, N'system', NULL, 0)
INSERT [dbo].[chat_lieu] ([id], [ten], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (8, N'lg5', CAST(N'2024-03-19T16:46:16.000' AS DateTime), NULL, N'system', NULL, 1)
SET IDENTITY_INSERT [dbo].[chat_lieu] OFF
GO
SET IDENTITY_INSERT [dbo].[de_giay] ON 

INSERT [dbo].[de_giay] ([id], [ten], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (1, N'đế cứng', CAST(N'2024-08-05T05:43:00.000' AS DateTime), CAST(N'2024-08-05T05:43:00.000' AS DateTime), N'Tuyên', NULL, 0)
INSERT [dbo].[de_giay] ([id], [ten], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (2, N'Đế cao su', CAST(N'2024-08-05T05:43:00.000' AS DateTime), CAST(N'2024-08-05T05:43:00.000' AS DateTime), NULL, NULL, 0)
INSERT [dbo].[de_giay] ([id], [ten], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (3, N'cao su đặc', CAST(N'2024-08-05T05:43:00.000' AS DateTime), CAST(N'2024-03-19T16:45:52.000' AS DateTime), NULL, N'system', 1)
INSERT [dbo].[de_giay] ([id], [ten], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (5, N'cao su đặc loại 2 1111', CAST(N'2024-03-17T21:13:00.000' AS DateTime), CAST(N'2024-03-19T16:45:49.000' AS DateTime), N'Tuyên 11', N'system', 1)
INSERT [dbo].[de_giay] ([id], [ten], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (7, N'đế Sg2', CAST(N'2024-03-18T12:27:47.000' AS DateTime), CAST(N'2024-03-19T16:45:46.000' AS DateTime), N'tuyen', N'system', 1)
INSERT [dbo].[de_giay] ([id], [ten], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (15, N'e42', CAST(N'2024-03-19T16:45:59.000' AS DateTime), NULL, N'system', NULL, 1)
SET IDENTITY_INSERT [dbo].[de_giay] OFF
GO
SET IDENTITY_INSERT [dbo].[dia_chi] ON 

INSERT [dbo].[dia_chi] ([id], [idTaiKhoan], [ten], [sdt], [thanhPho], [huyen], [xa], [moTa], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (1, 1, N'Tuyen', N'09999999991', N'Hà Nội', N'DP', N'DP', N'số 1, đường A', CAST(N'2024-08-05T05:43:00.000' AS DateTime), NULL, NULL, NULL, 1)
INSERT [dbo].[dia_chi] ([id], [idTaiKhoan], [ten], [sdt], [thanhPho], [huyen], [xa], [moTa], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (8, 2, N'Pariatur Architecto', N'09999995765', N'26', N'251', N'09037', N'Autem dolor at provi', CAST(N'2024-03-25T14:06:37.000' AS DateTime), NULL, NULL, NULL, 1)
INSERT [dbo].[dia_chi] ([id], [idTaiKhoan], [ten], [sdt], [thanhPho], [huyen], [xa], [moTa], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (9, 3, N'Phạm  Văn Th', N'0999991112', N'31', N'314', N'11704', N'Autem dolor at provi', CAST(N'2024-03-25T14:07:36.000' AS DateTime), NULL, NULL, NULL, 1)
INSERT [dbo].[dia_chi] ([id], [idTaiKhoan], [ten], [sdt], [thanhPho], [huyen], [xa], [moTa], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (10, 4, N'lù văn chải', N'0981235212', N'79', N'769', N'27094', NULL, CAST(N'2024-03-25T14:17:13.000' AS DateTime), NULL, NULL, NULL, 1)
INSERT [dbo].[dia_chi] ([id], [idTaiKhoan], [ten], [sdt], [thanhPho], [huyen], [xa], [moTa], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (11, 15, N'1231', N'0912312311', N'92', N'926', N'31303', NULL, CAST(N'2024-03-25T14:18:29.000' AS DateTime), NULL, NULL, NULL, 1)
SET IDENTITY_INSERT [dbo].[dia_chi] OFF
GO
SET IDENTITY_INSERT [dbo].[kich_co] ON 

INSERT [dbo].[kich_co] ([id], [ten], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (2, N'37', CAST(N'2024-08-05T05:43:00.000' AS DateTime), NULL, NULL, NULL, 1)
INSERT [dbo].[kich_co] ([id], [ten], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (3, N'38', CAST(N'2024-08-05T05:43:00.000' AS DateTime), NULL, NULL, NULL, 1)
INSERT [dbo].[kich_co] ([id], [ten], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (4, N'39', CAST(N'2024-08-05T05:43:00.000' AS DateTime), NULL, NULL, NULL, 1)
INSERT [dbo].[kich_co] ([id], [ten], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (5, N'40', CAST(N'2024-08-05T05:43:00.000' AS DateTime), NULL, NULL, NULL, 1)
INSERT [dbo].[kich_co] ([id], [ten], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (6, N'41', CAST(N'2024-08-05T05:43:00.000' AS DateTime), NULL, NULL, NULL, 1)
INSERT [dbo].[kich_co] ([id], [ten], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (7, N'42', CAST(N'2024-08-05T05:43:00.000' AS DateTime), NULL, NULL, NULL, 1)
INSERT [dbo].[kich_co] ([id], [ten], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (9, N'39.5', CAST(N'2024-03-19T17:38:19.000' AS DateTime), CAST(N'2024-03-19T17:38:32.000' AS DateTime), N'system', N'system', 0)
SET IDENTITY_INSERT [dbo].[kich_co] OFF
GO
SET IDENTITY_INSERT [dbo].[mau_sac] ON 

INSERT [dbo].[mau_sac] ([id], [ten], [maMau], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (35, N'blue', NULL, CAST(N'2024-03-20T16:36:03.000' AS DateTime), NULL, N'system', NULL, 0)
INSERT [dbo].[mau_sac] ([id], [ten], [maMau], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (36, N'white', NULL, CAST(N'2024-03-20T16:36:07.000' AS DateTime), CAST(N'2024-03-20T16:47:02.000' AS DateTime), N'system', N'system', 0)
INSERT [dbo].[mau_sac] ([id], [ten], [maMau], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (37, N'black', NULL, CAST(N'2024-03-20T16:36:11.000' AS DateTime), NULL, N'system', NULL, 0)
INSERT [dbo].[mau_sac] ([id], [ten], [maMau], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (38, N'red', NULL, CAST(N'2024-03-20T16:36:18.000' AS DateTime), CAST(N'2024-03-20T16:52:33.000' AS DateTime), N'system', N'system', 0)
INSERT [dbo].[mau_sac] ([id], [ten], [maMau], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (39, N'yellow', NULL, CAST(N'2024-03-20T16:36:26.000' AS DateTime), CAST(N'2024-03-20T16:43:39.000' AS DateTime), N'system', N'system', 1)
SET IDENTITY_INSERT [dbo].[mau_sac] OFF
GO
SET IDENTITY_INSERT [dbo].[san_pham] ON 

INSERT [dbo].[san_pham] ([id], [idThuongHieu], [ten], [moTa], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (1, 1, N'Giày chạy bộ 4d', NULL, CAST(N'2024-08-05T05:43:00.000' AS DateTime), NULL, N'Tuyên', NULL, 1)
INSERT [dbo].[san_pham] ([id], [idThuongHieu], [ten], [moTa], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (2, 1, N'Giày Nike chạy bộ', NULL, CAST(N'2024-08-05T05:43:00.000' AS DateTime), NULL, NULL, NULL, 1)
INSERT [dbo].[san_pham] ([id], [idThuongHieu], [ten], [moTa], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (3, 2, N'adidas chạy bộ nam nữ', NULL, CAST(N'2024-08-05T05:43:00.000' AS DateTime), NULL, N'Tuyên', NULL, 1)
INSERT [dbo].[san_pham] ([id], [idThuongHieu], [ten], [moTa], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (4, 2, N'adidas chạy bộ Ultraboost ', NULL, CAST(N'2024-08-05T05:43:00.000' AS DateTime), NULL, NULL, NULL, 1)
INSERT [dbo].[san_pham] ([id], [idThuongHieu], [ten], [moTa], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (5, 3, N'giày vải Thượng Đình', NULL, CAST(N'2024-08-05T05:43:00.000' AS DateTime), NULL, NULL, NULL, 1)
INSERT [dbo].[san_pham] ([id], [idThuongHieu], [ten], [moTa], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (6, 3, N'Giày chạy bộ Thượng đình 4d', NULL, NULL, NULL, NULL, NULL, 1)
SET IDENTITY_INSERT [dbo].[san_pham] OFF
GO
SET IDENTITY_INSERT [dbo].[tai_khoan] ON 

INSERT [dbo].[tai_khoan] ([id], [ten], [sdt], [ngaySinh], [email], [gioiTinh], [cccd], [anh], [vaiTro], [matKhau], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (1, N'Phạm Văn A', N'09877712312', CAST(N'2002-01-05' AS Date), N'tuyen@gmail.com', 1, N'09998213212', N'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0Lcmweh9LOmU46Db6-emwgRfAGxP3vdLirWHLLImIZvqhU9MoJzQa5Uz_vKvxyYUcmqE&usqp=CAU', 2, N'123', CAST(N'2024-08-05T05:43:00.000' AS DateTime), NULL, N'Tuyên', NULL, 1)
INSERT [dbo].[tai_khoan] ([id], [ten], [sdt], [ngaySinh], [email], [gioiTinh], [cccd], [anh], [vaiTro], [matKhau], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (2, N'1', N'01111111111', CAST(N'2002-01-05' AS Date), N'tuyen@gmail.com', 1, N'0222123231231', N'https://dayve.vn/wp-content/uploads/2023/01/Ve-chu-meo-Tom-buoc-13.jpg', 1, N'123', CAST(N'2024-08-05T05:43:00.000' AS DateTime), NULL, NULL, NULL, 1)
INSERT [dbo].[tai_khoan] ([id], [ten], [sdt], [ngaySinh], [email], [gioiTinh], [cccd], [anh], [vaiTro], [matKhau], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (3, N'Admin', N'09877712312', CAST(N'2002-02-05' AS Date), N'tuyen21@gmail.com', 0, N'0999821113212', N'https://i.pinimg.com/736x/d7/c7/97/d7c797135559fc00aecc983eff4a65e4.jpg', 0, N'123', CAST(N'2024-08-05T05:43:00.000' AS DateTime), NULL, NULL, NULL, 1)
INSERT [dbo].[tai_khoan] ([id], [ten], [sdt], [ngaySinh], [email], [gioiTinh], [cccd], [anh], [vaiTro], [matKhau], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (4, N'3322', N'09877712312', CAST(N'2002-01-05' AS Date), N'tuyen@gmail.com', 1, N'09998221413212', N'https://i.pinimg.com/736x/d7/c7/97/d7c797135559fc00aecc983eff4a65e4.jpg', 1, N'123', CAST(N'2024-08-05T05:43:00.000' AS DateTime), NULL, NULL, NULL, 1)
INSERT [dbo].[tai_khoan] ([id], [ten], [sdt], [ngaySinh], [email], [gioiTinh], [cccd], [anh], [vaiTro], [matKhau], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (15, N'1231', N'0912312311', CAST(N'2024-03-25' AS Date), N't@fgmail.com', 1, N'312312312313', N'', 1, N'1322', CAST(N'2024-03-25T14:18:29.000' AS DateTime), NULL, NULL, NULL, 1)
SET IDENTITY_INSERT [dbo].[tai_khoan] OFF
GO
SET IDENTITY_INSERT [dbo].[thuong_hieu] ON 

INSERT [dbo].[thuong_hieu] ([id], [ten], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (1, N'nike', CAST(N'2024-08-05T00:00:00.000' AS DateTime), CAST(N'2024-08-05T05:43:00.000' AS DateTime), N'Huy', N'Huy', 1)
INSERT [dbo].[thuong_hieu] ([id], [ten], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (2, N'adidas', CAST(N'2024-08-05T05:43:00.000' AS DateTime), CAST(N'2024-08-05T05:43:00.000' AS DateTime), N'Thanh', N'thanh', 1)
INSERT [dbo].[thuong_hieu] ([id], [ten], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (3, N'giày Thượng đình', CAST(N'2024-08-05T05:43:00.000' AS DateTime), CAST(N'2024-08-05T15:03:00.000' AS DateTime), N'Tuyên', N'tuyên', 1)
INSERT [dbo].[thuong_hieu] ([id], [ten], [ngayTao], [ngayCapNhat], [nguoiTao], [nguoiCapNhat], [trangThai]) VALUES (5, N'bb2', CAST(N'2024-03-19T16:50:34.000' AS DateTime), NULL, N'system', NULL, 1)
SET IDENTITY_INSERT [dbo].[thuong_hieu] OFF
GO
ALTER TABLE [dbo].[anh]  WITH CHECK ADD  CONSTRAINT [FK_anh_chi_tiet_san_pham] FOREIGN KEY([idChiTietSP])
REFERENCES [dbo].[chi_tiet_san_pham] ([id])
GO
ALTER TABLE [dbo].[anh] CHECK CONSTRAINT [FK_anh_chi_tiet_san_pham]
GO
ALTER TABLE [dbo].[chi_tiet_san_pham]  WITH CHECK ADD  CONSTRAINT [FK_chi_tiet_san_pham_chat_lieu] FOREIGN KEY([idChatLieu])
REFERENCES [dbo].[chat_lieu] ([id])
GO
ALTER TABLE [dbo].[chi_tiet_san_pham] CHECK CONSTRAINT [FK_chi_tiet_san_pham_chat_lieu]
GO
ALTER TABLE [dbo].[chi_tiet_san_pham]  WITH CHECK ADD  CONSTRAINT [FK_chi_tiet_san_pham_de_giay] FOREIGN KEY([idDeGiay])
REFERENCES [dbo].[de_giay] ([id])
GO
ALTER TABLE [dbo].[chi_tiet_san_pham] CHECK CONSTRAINT [FK_chi_tiet_san_pham_de_giay]
GO
ALTER TABLE [dbo].[chi_tiet_san_pham]  WITH CHECK ADD  CONSTRAINT [FK_chi_tiet_san_pham_kich_co] FOREIGN KEY([idKichCo])
REFERENCES [dbo].[kich_co] ([id])
GO
ALTER TABLE [dbo].[chi_tiet_san_pham] CHECK CONSTRAINT [FK_chi_tiet_san_pham_kich_co]
GO
ALTER TABLE [dbo].[chi_tiet_san_pham]  WITH CHECK ADD  CONSTRAINT [FK_chi_tiet_san_pham_mau_sac] FOREIGN KEY([idMauSac])
REFERENCES [dbo].[mau_sac] ([id])
GO
ALTER TABLE [dbo].[chi_tiet_san_pham] CHECK CONSTRAINT [FK_chi_tiet_san_pham_mau_sac]
GO
ALTER TABLE [dbo].[chi_tiet_san_pham]  WITH CHECK ADD  CONSTRAINT [FK_chi_tiet_san_pham_san_pham] FOREIGN KEY([idSanPham])
REFERENCES [dbo].[san_pham] ([id])
GO
ALTER TABLE [dbo].[chi_tiet_san_pham] CHECK CONSTRAINT [FK_chi_tiet_san_pham_san_pham]
GO
ALTER TABLE [dbo].[dia_chi]  WITH CHECK ADD FOREIGN KEY([idTaiKhoan])
REFERENCES [dbo].[tai_khoan] ([id])
GO
ALTER TABLE [dbo].[gio_hang]  WITH CHECK ADD  CONSTRAINT [FK__gio_hang__idChiT__4BAC3F29] FOREIGN KEY([idChiTietSanPham])
REFERENCES [dbo].[chi_tiet_san_pham] ([id])
GO
ALTER TABLE [dbo].[gio_hang] CHECK CONSTRAINT [FK__gio_hang__idChiT__4BAC3F29]
GO
ALTER TABLE [dbo].[gio_hang]  WITH CHECK ADD FOREIGN KEY([idTaiKhoan])
REFERENCES [dbo].[tai_khoan] ([id])
GO
ALTER TABLE [dbo].[hoa_don]  WITH CHECK ADD  CONSTRAINT [FK__hoa_don__idTaiKh__44FF419A] FOREIGN KEY([idTaiKhoan])
REFERENCES [dbo].[tai_khoan] ([id])
GO
ALTER TABLE [dbo].[hoa_don] CHECK CONSTRAINT [FK__hoa_don__idTaiKh__44FF419A]
GO
ALTER TABLE [dbo].[hoa_don]  WITH CHECK ADD  CONSTRAINT [FK_hoa_don_giam_gia] FOREIGN KEY([idGiamGia])
REFERENCES [dbo].[giam_gia] ([id])
GO
ALTER TABLE [dbo].[hoa_don] CHECK CONSTRAINT [FK_hoa_don_giam_gia]
GO
ALTER TABLE [dbo].[hoa_don_chi_tiet]  WITH CHECK ADD  CONSTRAINT [FK__hoa_don_c__idChi__60A75C0F] FOREIGN KEY([idChiTietSanPham])
REFERENCES [dbo].[chi_tiet_san_pham] ([id])
GO
ALTER TABLE [dbo].[hoa_don_chi_tiet] CHECK CONSTRAINT [FK__hoa_don_c__idChi__60A75C0F]
GO
ALTER TABLE [dbo].[hoa_don_chi_tiet]  WITH CHECK ADD  CONSTRAINT [FK__hoa_don_c__idHoa__619B8048] FOREIGN KEY([idHoaDon])
REFERENCES [dbo].[hoa_don] ([id])
GO
ALTER TABLE [dbo].[hoa_don_chi_tiet] CHECK CONSTRAINT [FK__hoa_don_c__idHoa__619B8048]
GO
ALTER TABLE [dbo].[lich_su_hoa_don]  WITH CHECK ADD  CONSTRAINT [FK__lich_su_h__idHoa__4F7CD00D] FOREIGN KEY([idHoaDon])
REFERENCES [dbo].[hoa_don] ([id])
GO
ALTER TABLE [dbo].[lich_su_hoa_don] CHECK CONSTRAINT [FK__lich_su_h__idHoa__4F7CD00D]
GO
ALTER TABLE [dbo].[phuong_thuc_thanh_toan]  WITH CHECK ADD  CONSTRAINT [FK__phuong_th__idHoa__52593CB8] FOREIGN KEY([idHoaDon])
REFERENCES [dbo].[hoa_don] ([id])
GO
ALTER TABLE [dbo].[phuong_thuc_thanh_toan] CHECK CONSTRAINT [FK__phuong_th__idHoa__52593CB8]
GO
ALTER TABLE [dbo].[san_pham]  WITH CHECK ADD  CONSTRAINT [FK__san_pham__idThuo__30F848ED] FOREIGN KEY([idThuongHieu])
REFERENCES [dbo].[thuong_hieu] ([id])
GO
ALTER TABLE [dbo].[san_pham] CHECK CONSTRAINT [FK__san_pham__idThuo__30F848ED]
GO
USE [master]
GO
ALTER DATABASE [XuongWebGiay] SET  READ_WRITE 
GO
